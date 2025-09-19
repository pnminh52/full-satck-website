import { sql } from "../config/db.js";

export const getShippingFee = async (req, res) => {
  const { region } = req.query;
  try {
    const fee = await sql`SELECT fee FROM shipping WHERE region = ${region} LIMIT 1`;
    res.json({ fee: fee[0]?.fee || 0 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ fee: 0 });
  }
};
