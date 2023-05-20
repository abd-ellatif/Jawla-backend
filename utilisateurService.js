pool = require("./database.js");

async function showtables() {
  const connection = await pool.getConnection();
  try {
    const users = await connection.query("show tables");
    return users;
  } finally {
    connection.release();
  }
}

module.exports = {
  showtables,
};
