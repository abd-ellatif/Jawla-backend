pool = require("../database.js");

  async function Rechercher(term, category, theme, etatOuverture) {
    const connection = await pool.getConnection();
    try {
        let query = `
          SELECT *
          FROM PointInteret
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
    
        connection.query(query, (err, results) => {
          if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'An error occurred' });
            return;
          }
    
          return res.json(results);
        });
      } catch (err) {
        console.error('Error connecting to MySQL:', err);
        res.status(500).json({ error: 'An error occurred' });
      }
  }
  /**
   const connection = await pool.getConnection(); // Assuming getConnection() returns a valid MySQL connection
   
   */

   module.exports = {Rechercher}
