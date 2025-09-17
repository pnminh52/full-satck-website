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

    // 2. Products (schema mới)
await sql`
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,          -- Tên sản phẩm (ngắn gọn)
  title VARCHAR(255),                  -- Tiêu đề chi tiết
  series VARCHAR(255),                 -- Series (vd: Hatsune Miku, Naruto,…)
  release_date DATE,                   -- Ngày phát hành
  decalProduction VARCHAR(255),        -- Đơn vị sản xuất decal
  specifications TEXT,                 -- Thông số chi tiết
  sculptor VARCHAR(255),               -- Người sculpt
  planningAndProduction VARCHAR(255),  -- Đơn vị Planning/Production
  productionCooperation VARCHAR(255),  -- Production cooperation
  paintwork VARCHAR(255),              -- Người phụ trách paintwork
  relatedInformation TEXT,             -- Thông tin liên quan
  manufacturer VARCHAR(255),           -- Hãng sản xuất
  distributedBy VARCHAR(255),          -- Nhà phân phối
  price DECIMAL(10,2) NOT NULL,        -- Giá bán
  stock INT DEFAULT 0,                 -- Tồn kho
  status VARCHAR(50) DEFAULT 'available',  -- Trạng thái (available, preorder, soldout,…)
  base_image TEXT,                     -- Ảnh chính
  imagecopyright TEXT,
  additional_images TEXT[],            -- Ảnh phụ
  category_id INT REFERENCES categories(id) ON DELETE SET NULL,
  description TEXT,                    -- Mô tả chi tiết
  copyrightSeries VARCHAR(255),        -- Bản quyền series
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
