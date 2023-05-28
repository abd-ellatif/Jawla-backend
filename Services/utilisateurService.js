pool = require("../database.js");

async function showtables() {
  const connection = await pool.getConnection();
  try {
    const [users] = await connection.query("show tables");
    return users;
  } finally {
    connection.release();
  }
}

async function AjouterCommentaire(iduser, idPI, commentaire, nombreEtoile) {
  const connection = await pool.getConnection();
  try {
    await connection.query(
      `insert into commentaire (nombreEtoile,texte,idUtilisateur,idPointInteret)
        values (?,?,?,?);`,
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
      `select * from quiz where idPointInteret = ?;`,
      [idPI]
    );
    const [Questions] = await connection.query(
      "select * from question where idQuiz = ?;",
      [quiz[0].idQuiz]
    );
    return { quiz, Questions };
  } finally {
    connection.release();
  }
}

//Theme,Categorie,Evenements,Offres,horaires,arretsTransport,responsable,commentaires
// Ajouter photos
async function AfficherDetailsPI(idPI) {
  const connection = await pool.getConnection();
  try {
    const [themes] = await connection.query(
      `Select designation from theme a JOIN (select idTheme from estdetheme 
      E where E.idPointInteret = ?) b ON  a.idTheme = b.idTheme;`,
      [idPI]
    );
    const [categories] = await connection.query(
      `Select designation from categorie a JOIN (select idCategorie from estdecategorie 
      E where E.idPointInteret = ?) b ON  a.idCategorie = b.idCategorie;`,
      [idPI]
    );
    const [evenements] = await connection.query(
      `select * from evenement where idPointInteret = ?;`,
      [idPI]
    );
    const [offres] = await connection.query(
      `select * from offre where idPointInteret = ?;`,
      [idPI]
    );
    const [horaires] = await connection.query(
      `select * from ouvrir where idPointInteret = ?;`,
      [idPI]
    );
    const [arretsTransport] = await connection.query(
      `select * from arrettransport where idPointInteret = ?;`,
      [idPI]
    );
    const [responsable] = await connection.query(
      `select nom,prenom,email,numerodetel from responsable R JOIN 
    (select idResponsable from PointInteret a WHERE a.idPointInteret = ?) b
    ON b.idResponsable = R.idResponsable;`,
      [idPI]
    );
    const [commentaires] = await connection.query(
      `select idCommentaire,nom,prenom,nombreEtoile,texte from utilisateur a JOIN (select * from commentaire where idPointInteret = ?) b 
    ON a.idUtilisateur = b.idUtilisateur`,
      [idPI]
    );

    return {
      themes,
      categories,
      evenements,
      offres,
      horaires,
      arretsTransport,
      commentaires,
      responsable,
    };
  } finally {
    connection.release();
  }
}

async function getCoordoones() {
  const connection = await pool.getConnection();
  try {
    const [points] = await connection.query(
      "select idPointInteret,latitude,longitude from pointInteret natural join (select * from coordoones) as c"
    );
    return points;
  } finally {
    connection.release();
  }
}

async function AjouterAuFavoris(idUtilisateur, idPI) {
  const connection = await pool.getConnection();
  try {
    await connection.query(`insert into Favoriser values (?,?);`, [
      idUtilisateur,
      idPI,
    ]);
  } finally {
    connection.release();
  }
}

async function AfficherFavoris(idUtilisateur) {
  const connection = await pool.getConnection();
  try {
    const [favoris] = await connection.query(
      `select idPointinteret,titre from pointInteret p Natural JOIN (select * from favoriser where idUtilisateur = ?) as f`,
      [idUtilisateur]
    );
    return favoris;
  } finally {
    connection.release();
  }
}

async function IncrementerNbrVisites(idPI) {
  const connection = await pool.getConnection();
  try {
    await connection.query(
      `update stqtistiques set nbrVisites = nbrVisites + 1 where idPointInteret = ?`,
      [idPI]
    );
  } finally {
    connection.release();
  }
}

module.exports = {
  showtables,
  AjouterCommentaire,
  AfficherQuiz,
  AfficherDetailsPI,
  getCoordoones,
  AjouterAuFavoris,
  AfficherFavoris,
  IncrementerNbrVisites,
};
