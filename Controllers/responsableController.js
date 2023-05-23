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
      req.body.arretsTransport);
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

responsableController.post("/AjouterQuiz/:idPI", async (req, res) => {
  try {
    const result = await responsableService.AjouterQuiz(req.params.idPI,req.body.quiz);
    res.status(200).send(result);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

responsableController.post("/AjouterEvenement/:idPI", async (req, res) => {
  try {
    const result = await responsableService.AjouterEvenement(
      req.params.idPI,
      req.body.evenement
    );
    res.status(200).send(result);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

responsableController.post("/AjouterOffre/:idPI", async (req, res) => {
  try {
    const result = await responsableService.AjouterOffre(
      req.params.idPI,
      req.body.offre
    );
    res.status(200).send(result);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = responsableController;
