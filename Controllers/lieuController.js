const express = require('express');
const lieuService = require("../Services/lieuService.js");

const router = express.Router();


/*
router.post('/AjouterLieu',(req,res,next)=> {
    
let product = req.body;
query = "insert into Wilaya (idWilaya,nom) values (?,?)"
connection.query(query,[product.idWilaya,product.nom],(err,results)=>{
    if(!err){
        return res.status(200).json({message:"Product Added Successfully"});
    }else{
        return res.status(500).json(err)
    }
})
})
*/
/*
router.get('/AfficherLieu/:id',(req,res)=>{
    connection.query(query,(err,results)=>{
        if(!err){
            return res.status(200).json(results);
        }else{
            return res.status(500).json(err);
        }
    })
})
*/
/*
//Pour modifier il faut verifier si celui qui modifie est le respo
router.patch('/ModifierLieu/:id',(req,res,next)=>{
    const id = req.params.id;
    let product = req.body;
    var query = "update product set name =?,description=?,price=? where id=?";
    connection.query(query,[product.name,product.description,product.price,id],(err,results)=>{
        if(!err){
            if(results.affectedRows==0){
                return res.status(404).json({message:"Product id is not found"})
            }
            return res.status(200).json({message:"Product updated successfully"})
        }else{
            return res.status(500).json(err);
        }
    })
})
*/
router.delete('/SupprimerLieu/:id',async (req,res,next)=>{
    const id = req.params.id;
    try {
        const result = await lieuService.Supprimer(id);
        res.status(200).send(result);
      } catch (e) {
        res.status(500).send(e.message);
      }
})


router.get("/RechercheLieu", async (req, res) => {
    const { term, category, theme, etatOuverture } = req.query;
    try {
        console.log("1",term,category,theme,etatOuverture);
      const result = await lieuService.Rechercher(term,category,theme,etatOuverture,res);
      res.status(200).json({message:"Succes"})
      res.status(200).send(result);
    } catch (e) {
      res.status(500).send(e.message);
    }
  });
//URL  = http://localhost:3000/lieu/RechercheLieu?term=hadja&category=hadja&theme=hadja&heureOuverture=hadja&heureFin=hadja



/*router.get('/RechercheLieu',async (req,res,next)=>{
    
    const { term, category, theme , heureOuverture , heureFin } = req.query;
    const connection = connection.getConnection();
  let query = `
  SELECT * 
  FROM (SELECT *
    FROM (
        SELECT idPointInteret,idCategorie 
        FROM EstdeCategorie 
        NATURAL JOIN (
            SELECT idCategorie,designation
            FROM categorie WHERE 
            designation='${category}'
            ))
            NATURAL JOIN(
                SELECT idPointInteret,idTheme 
                FROM EstdeTheme
                NATURAL JOIN (
                    SELECT idtheme,designation 
                    FROM theme 
                    WHERE designation='${theme}'))
        )
  NATURAL JOIN(
    SELECT idPoinInteret 
    FROM PointInteret 
    WHERE titre like '%${term}%')
  `;
  // Execute the SQL query
  try {
    await connection.query(query, (err, results) => {
        if (err) {
          console.error('Error executing query:', err);
          res.status(500).json({ error: 'An error occurred' });
          return;
        }
    
        res.json(results);
      });
      
  }catch{
    res.status(500).json({ error: 'error when sending the query' });
  }
  
})*/


module.exports = router;

/*
 express = require("express");
const responsableService = require("../Services/responsableService");

const responsableController = express.Router();

responsableController.post("/ajouterLieu/:idResponsable", async (req, res) => {
  try {
    const result = await responsableService.AjouterLieu(
      req.params.idResponsable,
      req.body.lieu,
      req.body.photos,
      req.body.themes,
      req.body.categories,
      req.body.horaires,
      req.body.arretsTransport
    );
    res.status(200).send(result);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// Pas implementé
responsableController.post("/ModifierLieu/:idPI", async (req, res) => {
  try {
    const result = await responsableService.ModifierLieu(req.params.idPI);
    res.status(200).send(result);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

 */