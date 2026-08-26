const express = require("express");
const path = require("path");
const mysql = require("mysql2/promise");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;
const root = __dirname;
const mysqlConfig = {
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "greenleaf_store"
};
let db;

app.use(express.json({ limit: "1mb" }));
app.use(express.static(root));

const readRows = async table => {
  const [rows] = await db.query(`SELECT data FROM ${table} ORDER BY id DESC`);
  return rows.map(row => JSON.parse(row.data));
};
const replaceRows = async (table, items) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();
    await connection.query(`DELETE FROM ${table}`);
    for (const item of items) {
      await connection.query(`INSERT INTO ${table} (id, data) VALUES (?, ?)`, [String(item.id ?? item.orderId), JSON.stringify(item)]);
    }
    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

app.get("/api/plants", async (req, res) => res.json(await readRows("plants")));
app.put("/api/plants", async (req, res) => {
  if (!Array.isArray(req.body)) return res.status(400).json({ error: "Expected an array of plants." });
  await replaceRows("plants", req.body);
  res.json({ ok: true });
});

app.get("/api/orders", async (req, res) => res.json(await readRows("orders")));
app.put("/api/orders", async (req, res) => {
  if (!Array.isArray(req.body)) return res.status(400).json({ error: "Expected an array of orders." });
  await replaceRows("orders", req.body);
  res.json({ ok: true });
});

app.get("/api/messages", async (req, res) => res.json(await readRows("messages")));
app.put("/api/messages", async (req, res) => {
  if (!Array.isArray(req.body)) return res.status(400).json({ error: "Expected an array of messages." });
  await replaceRows("messages", req.body);
  res.json({ ok: true });
});

app.post("/api/admin/login", (req, res) => {
  const { username, password } = req.body || {};
  const validUser = username === "admin" || username === "greenleaf";
  const validPassword = password === "admin123" || password === "admin";
  if (!validUser || !validPassword) return res.status(401).json({ error: "Invalid username or password." });
  res.json({ ok: true });
});

async function start() {
  const adminConnection = await mysql.createConnection({ ...mysqlConfig, database: undefined });
  await adminConnection.query(`CREATE DATABASE IF NOT EXISTS \`${mysqlConfig.database}\``);
  await adminConnection.end();
  db = mysql.createPool({ ...mysqlConfig, waitForConnections: true, connectionLimit: 10 });
  await db.query(`CREATE TABLE IF NOT EXISTS plants (id VARCHAR(64) PRIMARY KEY, data JSON NOT NULL)`);
  await db.query(`CREATE TABLE IF NOT EXISTS orders (id VARCHAR(64) PRIMARY KEY, data JSON NOT NULL)`);
  await db.query(`CREATE TABLE IF NOT EXISTS messages (id VARCHAR(64) PRIMARY KEY, data JSON NOT NULL)`);
  app.get(/.*/, (req, res) => res.sendFile(path.join(root, "index5.html")));
  app.listen(port, () => console.log(`GreenLeaf is running at http://localhost:${port}`));
}

start().catch(error => {
  console.error("Could not connect to MySQL. Start MySQL and check your .env database settings.", error.message);
  process.exit(1);
});
