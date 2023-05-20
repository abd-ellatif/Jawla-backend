express = require("express");
const utilisateurService = require("./utilisateurService.js");

const utilisateurController = express.Router();

utilisateurController.get("/showtables", async (req, res) => {
  try {
    const result = await utilisateurService.showtables();
    console.log(result[0]);
    res.status(200).send(result[0]);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

//Ajouter commentaire (iduser et idPI)
//Afficher quiz by idPI
//Afficher details Pi by idPI

module.exports = utilisateurController;
