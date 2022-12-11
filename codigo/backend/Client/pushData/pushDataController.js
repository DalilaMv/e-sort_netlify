const express = require("express");
const router = express.Router();
const pushData = require("./pushData");

router.get("/pushData/last", (req, res) => {
  pushData
    .findOne({
      order: [["updatedAt", "DESC"]],
    })
    .then((pushData) => {
      res.json({ pushData });
    })
    .catch((err) => {
      res.json({ msg: "Erro encontrado", err });
    });
});

module.exports = router;
