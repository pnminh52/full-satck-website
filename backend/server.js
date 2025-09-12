import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

import productRoutes from "./routes/productRoutes.js";
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

async function initDB() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log("✅ Table 'products' ensured");
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
