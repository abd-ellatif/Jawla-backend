const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

pool = mysql
  .createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  })
  .promise();

// Function example

async function getPointsinterets() {
  const [rows] = await pool.execute("SELECT * FROM PointsInterets");
  return rows;
}

module.exports = pool;
