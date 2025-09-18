import { sql } from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendResetPasswordEmail } from "../lib/mailerConfig.js";

const JWT_SECRET = process.env.JWT_SECRET;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

// ---------- Register ----------
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

// ---------- Login ----------
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await sql`SELECT * FROM users WHERE email = ${email}`;
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

// ---------- Forgot Password ----------
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (!user.length) return res.status(400).json({ error: "User not found" });

    const token = crypto.randomBytes(32).toString("hex");
    const expires_at = new Date(Date.now() + 60 * 60 * 1000); // 1h

    // Lưu token (user_id cần unique)
    await sql`
      INSERT INTO password_resets (user_id, token, expires_at)
      VALUES (${user[0].id}, ${token}, ${expires_at})
      ON CONFLICT (user_id) DO UPDATE
      SET token = ${token}, expires_at = ${expires_at};
    `;

    const resetLink = `${FRONTEND_URL}/reset-password?token=${token}&email=${email}`;

    // Gửi mail qua configMailer.js
    await sendResetPasswordEmail(email, resetLink);

    res.json({ message: "Reset password email sent" });
  } catch (err) {
    console.error("❌ Forgot password error:", err.message);
    res.status(500).json({ error: "Could not send reset email" });
  }
};

// ---------- Reset Password ----------
export const resetPassword = async (req, res) => {
  const { email, token, newPassword } = req.body;
  try {
    const user = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (!user.length) return res.status(400).json({ error: "User not found" });

    const reset = await sql`SELECT * FROM password_resets WHERE user_id = ${user[0].id} AND token = ${token}`;
    if (!reset.length) return res.status(400).json({ error: "Invalid token" });
    if (new Date(reset[0].expires_at) < new Date())
      return res.status(400).json({ error: "Token expired" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await sql`UPDATE users SET password = ${hashedPassword} WHERE id = ${user[0].id}`;

    // Xóa token sau khi dùng
    await sql`DELETE FROM password_resets WHERE user_id = ${user[0].id}`;

    res.json({ message: "Password reset successfully" });
  } catch (err) {
    console.error("❌ Reset password error:", err.message);
    res.status(500).json({ error: "Could not reset password" });
  }
};
