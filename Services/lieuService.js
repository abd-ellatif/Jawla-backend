pool = require("../database.js");

async function Rechercher(term, category, theme, etatOuverture) {
    const connection = await pool.getConnection();
    try {
      console.log("2", term, category, theme, etatOuverture);
      let query = `
        SELECT *
        FROM pointinteret
        WHERE titre LIKE '%${term}%'
      `;
  
      if (category) {
        query += `
          AND idPointInteret IN (
            SELECT idPointInteret
            FROM EstdeCategorie
            WHERE idCategorie = (
              SELECT idCategorie
              FROM Categorie 
              WHERE designation = '${category}'
            )
          )
        `;
      }
  
      if (theme) {
        query += `
          AND idPointInteret IN (
            SELECT idPointInteret
            FROM EstdeTheme
            WHERE idTheme = (
              SELECT idTheme
              FROM Theme
              WHERE designation = '${theme}'
            )
          )
        `;
      }
      if (etatOuverture) {
        query += `
          AND idPointInteret IN (
            SELECT idPointInteret
            FROM ouvrir
            WHERE heureOuverture >= CURRENT_TIME and heurefin < CURRENT_TIME
          )
        `;
      }
      const [results] = await connection.execute(query);
      return results;
    } catch (err) {
      console.error('Error connecting to MySQL:', err);
    } finally {
      connection.release(); // Libérer la connexion à la base de données
    }
  }
  
  /**
   const connection = await pool.getConnection(); // Assuming getConnection() returns a valid MySQL connection
   */

   async function Supprimer(id) {
       const connection = await pool.getConnection()
    try {
       var query=`delete from pointinteret where idPointInteret ='${id}'`
       const [results] = await connection.execute(query);
       return results;
   }
   catch (err) {
    console.error('Error connecting to MySQL:', err);
  } finally {
    connection.release(); // Libérer la connexion à la base de données
  }
}



   module.exports = {Rechercher,Supprimer}
