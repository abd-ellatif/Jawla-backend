const express = require("express");
const utilisateurController = require("./utilisateurController.js");

const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.send("Jawla Backend");
});

app.use("/utilisateur", utilisateurController);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
