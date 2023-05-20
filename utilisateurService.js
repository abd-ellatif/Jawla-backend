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

async function AjouterCommentaire(iduser, idPI, commentaire, nombreEtoile) {
  const connection = await pool.getConnection();
  try {
    await connection.query(
      `insert into Commentaire (nombreEtoile,texte,idUtilisateur,idPointInteret)
        values (?,?,?,?,?);`,
      [nombreEtoile, commentaire, iduser, idPI]
    );
  } finally {
    connection.release();
  }
}

async function AfficherQuiz(idPI) {
  const connection = await pool.getConnection();
  try {
    const [quiz] = await connection.query(
      `select * from Quiz where idPointInteret = ?;`,
      [idPI]
    );
    const [Questions] = await connection.query(
      "select * from Question where idQuiz = ?;",
      [quiz.idQuiz]
    );
    return { quiz, Questions };
  } finally {
    connection.release();
  }
}

module.exports = {
  showtables,
  AjouterCommentaire,
  AfficherQuiz,
};
