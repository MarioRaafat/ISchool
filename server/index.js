import express from 'express';
import Pool from "pg";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const sql = fs.readFileSync("./models/schema.sql").toString();

export const pool = new Pool.Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
});

pool.query(sql, (err, res) => {
    if (err) {
        console.error(err);
    } else {
        console.log('Database schema created successfully');
    }
    pool.end();
});


app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});