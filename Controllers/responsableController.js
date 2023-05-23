express = require("express");
const responsableService = require("../Services/responsableService");

const responsableController = express.Router();


responsableController.post("/ajouterLieu/:idResponsable", async (req, res) => {
  try {
    await responsableService.AjouterLieu(
      req.params.idResponsable,
      req.body.lieu,
      req.body.photos,
      req.body.themes,
      req.body.categories,
      req.body.horaires,
      req.body.arretsTransport
    );
  } catch (error) {
    console.error(error);
  }
  res.status(200).send("ok");
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

responsableController.delete(
  "/SupprimerCommentaire/:idCommentaire",
  async (req, res) => {
    try {
      const result = await responsableService.SupprimerCommentaire(
        req.params.idCommentaire
      );
      res.status(200).send(result);
    } catch (e) {
      console.error(e);
      res.status(500).send(e.message);
    }
  }
);

responsableController.post("/AjouterQuiz/:idPI", async (req, res) => {
  try {
    const result = await responsableService.AjouterQuiz(
      req.params.idPI,
      req.body
    );
    res.status(200).send(result);
  } catch (e) {
    console.error(e);
    res.status(500).send(e.message);
  }
});

responsableController.post("/AjouterEvenement/:idPI", async (req, res) => {
  try {
    const result = await responsableService.AjouterEvenement(
      req.params.idPI,
      req.body
    );
    res.status(200).send(result);
  } catch (e) {
    console.error(e);
    res.status(500).send(e.message);
  }
});

responsableController.post("/AjouterOffre/:idPI", async (req, res) => {
  try {
    const result = await responsableService.AjouterOffre(
      req.params.idPI,
      req.body
    );
    res.status(200).send(result);
  } catch (e) {
    console.error(e);
    res.status(500).send(e.message);
  }
});

module.exports = responsableController;
