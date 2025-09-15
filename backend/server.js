import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import variantRoutes from "./routes/variantRoutes.js"

import { sql } from "./config/db.js";
import { aj } from "./lib/arcjetConfig.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Backend run successfully!");
});

app.use(async (req, res, next) => {
  try {
    const decision = await aj.protect(req, {
      requested: 1,
    });
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        res.status(429).json({ error: "Too many requests" });
      }else if (decision.reason.isBot) {
        res.status(403).json({ error: "Bot access denied" });
      } else {
        res.status(403).json({ error: "Forbidden" });
      }
      return;
    } 
if(decision.results.some((results)=>results.reason.isBot() && results.reason.isSpoofed())){
    res.status(403).json({ error: "Spoofed bot detected" });
    return

}

    next()
  } catch (error) {
    next(error)
  }
});

// Dùng route
app.use("/api/products", productRoutes);

app.use("/api/categories", categoryRoutes);

app.use("/api/product-variants", variantRoutes);
async function initDB() {
  try {
    // 1. Categories
    await sql`
      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image TEXT,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // 2. Products (thông tin chung)
    await sql`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        base_image TEXT,
        additional_images TEXT[],
        category_id INT REFERENCES categories(id) ON DELETE SET NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // 3. Product Variants (màu, dung lượng, size…)
    await sql`
      CREATE TABLE IF NOT EXISTS product_variants (
        id SERIAL PRIMARY KEY,
        product_id INT REFERENCES products(id) ON DELETE CASCADE,
        color VARCHAR(100),
         color_code VARCHAR(7),
          additional_images TEXT[],
        storage VARCHAR(100),
        size VARCHAR(100),
        price DECIMAL(10,2) NOT NULL,
        stock INT DEFAULT 0,
        image VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // 4. Orders
    await sql`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        user_id INT,
        total DECIMAL(10,2) NOT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // 5. Order Items
    await sql`
      CREATE TABLE IF NOT EXISTS order_items (
        id SERIAL PRIMARY KEY,
        order_id INT REFERENCES orders(id) ON DELETE CASCADE,
        variant_id INT REFERENCES product_variants(id) ON DELETE SET NULL,
        quantity INT NOT NULL,
        price DECIMAL(10,2) NOT NULL
      );
    `;

    console.log("✅ Database initialized successfully (Apple schema)");
  } catch (error) {
    console.error("❌ DB error:", error.message);
  }
}



// Gọi hàm khởi tạo DB
initDB().then(() => {
  app.listen(PORT, () => {
    console.log("✅ Server running on http://localhost:" + PORT);
  });
});
