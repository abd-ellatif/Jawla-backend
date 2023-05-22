express = require("express");
const employeService = require("./employeService.js");

const employeController = express.Router();

employeController.get("/AfficherDemandes", async (req, res) => {
  try {
    const result = await employeService.AfficherDemandes();
    res.status(200).send(result);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

employeController.post("/AccepterDemande/:idPI", async (req, res) => {
  try {
    const result = await employeService.AccepterDemande(req.params.idPI);
    res.status(200);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = employeController;
