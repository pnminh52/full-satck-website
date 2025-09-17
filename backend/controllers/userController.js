import { sql } from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

// Đăng ký
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await sql`
      INSERT INTO users (name, email, password)
      VALUES (${name}, ${email}, ${hashedPassword})
      RETURNING id, name, email
    `;
    res.status(201).json({ message: "User registered", user: user[0] });
  } catch (err) {
    console.error("❌ Register error:", err.message);
    res.status(500).json({ error: "Register failed" });
  }
};

// Đăng nhập
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await sql`
      SELECT * FROM users WHERE email = ${email}
    `;
    if (!user.length) return res.status(400).json({ error: "User not found" });

    const validPass = await bcrypt.compare(password, user[0].password);
    if (!validPass) return res.status(400).json({ error: "Invalid password" });

    const token = jwt.sign({ id: user[0].id }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ message: "Login success", token, user: { id: user[0].id, name: user[0].name, email: user[0].email } });
  } catch (err) {
    console.error("❌ Login error:", err.message);
    res.status(500).json({ error: "Login failed" });
  }
};
