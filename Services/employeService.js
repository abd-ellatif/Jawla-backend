pool = require("../database.js");

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
  AfficherStatsGlobales
};
