pool = require("../database.js");
database = pool;

// *************** Log In *************
const EmployeLogin = (email, password, callback) => {
  // Definition de la requete
  const query = "SELECT * FROM employé WHERE email = ?";
  // exécution de la requete (recherche de l'employé qui a comme adresse , l'adresse entrée)
  database.query(query, [email], (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      callback(error, null);
      return;
    }

    // verification de l'existance de l'adresse
    if (results.length === 0) {
      // si l'ensemble de resultat est vide c'est à dire "aucun employé n'est inscrit avec cette adresse mail"
      const errorMessage = "Adresse mail incorrecte";
      callback(errorMessage, null);
      return;
    }

    // affectation de l'employé trouvé à la constante employe
    const employe = results[0];
    // Vérification du mot de passe
    if (employe.motDepasse !== password) {
      // si cette condition n'est pas vérifiée c'est à dire que "le mot de passe entré est incorrect"
      const errorMessage = "Mot de passe incorrect";
      callback(errorMessage, null);
      return;
    }

    // Sinon retourner l'id de l'employé connecté
    const employeId = employe.idEmployé;
    callback(null, employeId);
  });
};

async function AfficherDemandes() {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.query(
      `select * from pointinteret where valide=0`
    );
    return result;
  } catch (e) {
    throw e;
  } finally {
    connection.release();
  }
}

async function AccepterDemande(idPI) {
  const connection = await pool.getConnection();
  try {
    await connection.query(
      `update pointinteret set valide=1 where idPointInteret=?`,
      [idPI]
    );
  } catch (e) {
    throw e;
  } finally {
    connection.release();
  }
}

async function AfficherStatsGlobales() {
  const connection = await pool.getConnection();
  try {
    const [[nbrVisites]] = await connection.query(
      "select sum(nbrVisites) from statistiques"
    );
    const [[nbrLieux]] = await connection.query(
      "select count(*) from pointinteret"
    );
    const [[nbrEvenements]] = await connection.query(
      "select count(*) from evenment"
    );
    return { nbrVisites, nbrLieux, nbrEvenements };
  } catch (e) {
    throw e;
  } finally {
    connection.release();
  }
}

module.exports = {
  AfficherDemandes,
  AccepterDemande,
  AfficherStatsGlobales,
  EmployeLogin,
};
