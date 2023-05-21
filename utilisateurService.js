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

//Theme,Categorie,Evenements,Offres,horaires,arretsTransport,responsable
async function  AfficherDetailsPI(idPI) {
  const connection = await pool.getConnection();
  try {
    const [themes] = await connection.query(`Select designation from theme a JOIN (select idTheme from Estdetheme 
      E where E.idPointInteret = ${idPI}) b ON  a.idTheme = b.idTheme;`);
    const [categories] = await connection.query(`Select designation from categorie a JOIN (select idCategorie from EstDecategorie 
      E where E.idPointInteret = ${idPI}) b ON  a.idCategorie = b.idCategorie;`);
    const [evenements] = await connection.query(`select * from evenement where idPointInteret = ${idPI};`);
    const [offres] = await connection.query(`select * from offre where idPointInteret = ${idPI};`);
    const [horaires] = await connection.query(`select * from ouvrir where idPointInteret = ${idPI};`);
    const [arretsTransport] = await connection.query(`select * from arretTransport where idPointInteret = ${idPI};`);
    const [responsable] = await connection.query(`select nom,prenom,email,numeroDeTel from responsable R JOIN 
    (select idResponsable from PointInteret a WHERE a.idPointInteret = ${idPI}) b
    ON b.idResponsable = R.idResponsable;`);

    return { themes, categories, evenements, offres, horaires, arretsTransport, responsable };
  } finally {
    connection.release();
  }

}



module.exports = {
  showtables,
  AjouterCommentaire,
  AfficherQuiz,
};
