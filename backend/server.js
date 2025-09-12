import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";


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

async function initDB() {
  try {
    // Tạo bảng categories trước
    await sql`
      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(255),
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Tạo bảng products
    await sql`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        title VARCHAR(255),
        description TEXT,
        material VARCHAR(255),
        carat VARCHAR(100),
        form VARCHAR(100),
        setting VARCHAR(100),
        style VARCHAR(100),
        price DECIMAL(10,2) NOT NULL,
        image VARCHAR(255) NOT NULL,
        additional_images TEXT[], 
        featured JSONB,
        category_id INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Thêm cột nếu sau này cần mở rộng (không lỗi nếu đã có)
    await sql`
      ALTER TABLE products
      ADD COLUMN IF NOT EXISTS additional_images TEXT[],
      ADD COLUMN IF NOT EXISTS featured JSONB,
      ADD COLUMN IF NOT EXISTS category_id INT;
    `;

    // Thêm FK nếu chưa tồn tại
    await sql`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.table_constraints
          WHERE constraint_name = 'fk_category'
        ) THEN
          ALTER TABLE products
          ADD CONSTRAINT fk_category
          FOREIGN KEY (category_id) REFERENCES categories(id)
          ON DELETE SET NULL;
        END IF;
      END$$;
    `;

    console.log("✅ Database initialized successfully");
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
