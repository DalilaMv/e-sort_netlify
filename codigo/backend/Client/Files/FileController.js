const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer");
const File = require("./File");
var stream = require("stream");

router.post("/file/save", upload.single("file"), (req, res) => {
  File.create({
    type: req.file.mimetype,
    name: req.file.originalname,
    data: req.file.buffer,
  })
    .then(() => {
      res.json({
        msg: "Sucesso ao enviar arquivo -> filename = " + req.file.originalname,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({ msg: "Erro", detail: err });
    });
});

router.get("/file/last", (req, res) => {
  File.findAll({
    order: [["updatedAt", "DESC"]],
  })
    .then((files) => {
      res.json({ id: files[0].id });
    })
    .catch((err) => {
      res.json({ msg: "Erro encontrado", err });
    });
});

router.get("/file/", (req, res) => {
  File.findAll({ attributes: ["id", "name"] })
    .then((files) => {
      res.json(files);
    })
    .catch((err) => {
      console.log(err);
      res.json({ msg: "Erro", detail: err });
    });
});

router.get("/file/:id", (req, res) => {
  File.findByPk(req.params.id)
    .then((file) => {
      var fileContents = Buffer.from(file.data, "base64");
      var readStream = new stream.PassThrough();
      readStream.end(fileContents);

      res.set("Content-disposition", "attachment; filename=" + file.name);
      res.set("Content-Type", file.type);

      readStream.pipe(res);
    })
    .catch((err) => {
      console.log(err);
      res.json({ msg: "Erro", detail: err });
    });
});

module.exports = router;
