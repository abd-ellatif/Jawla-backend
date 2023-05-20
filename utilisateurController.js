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

utilisateurController.post(
  "/AjouterCommentaire/:idUser/:idPI",
  async (req, res) => {
    try {
      const result = await utilisateurService.AjouterCommentaire(
        req.params.idUser,
        req.params.idPI,
        req.body.commentaire,
        req.body.nombreEtoile
      );
      res.status(200);
    } catch (e) {
      res.status(500).send(e.message);
    }
  }
);

utilisateurController.get("/AfficherQuiz/:idPI", async (req, res) => {
  try {
    const result = await utilisateurService.AfficherQuiz(req.params.idPI);
    res.status(200).send(result);
  } catch (e) {
    res.status(500).send(e.message);
  }
});











//Afficher details Pi by idPI

module.exports = utilisateurController;
