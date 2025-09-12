import { neon } from "@neondatabase/serverless";
import dotenv  from 'dotenv';
import { sql } from "./config/db.js";

dotenv.config()

const {PGHOST,PGDATABASE,PGUSER,PGPASSWORD  }=process.env

export const sql = neon(
    `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require&channel_binding=require`
)