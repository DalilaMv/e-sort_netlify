const express = require("express");
const router = express.Router();
const Esporte = require("./Esporte");
var amqp = require("amqplib/callback_api");
router.post("/sport/save", (req, res) => {
  const myArr = {
    typeReq: "saveReq",
    nome: req.body.nome,
    maxEquipe: req.body.maxEquipe,
  };
  amqp.connect(
    "amqps://ioulcnyy:L6Q9dUUOp-XjNfA6YV6QeoWd0s_rfR2B@jackal.rmq.cloudamqp.com/ioulcnyy",
    function (error0, connection) {
      if (error0) {
        throw error0;
      }
      connection.createChannel(function (error1, channel) {
        if (error1) {
          throw error1;
        }

        var queue = "queueEsporte";
        var msg = Buffer.from(JSON.stringify(myArr));

        channel.assertQueue(queue, {
          durable: false,
        });
        channel.sendToQueue(queue, Buffer.from(msg));

        console.log(" [x] Sent %s", msg);
      });
      setTimeout(function () {
        connection.close();
      }, 500);
    }
  );
  res.json({
    msg: "Esporte registrado com sucesso",
    status: true,
  });
});

router.post("/sport/delete/:id", (req, res) => {
  const myArr = {
    typeReq: "deleteReq",

    id: req.params.id,
  };
  amqp.connect(
    "amqps://ioulcnyy:L6Q9dUUOp-XjNfA6YV6QeoWd0s_rfR2B@jackal.rmq.cloudamqp.com/ioulcnyy",
    function (error0, connection) {
      if (error0) {
        throw error0;
      }
      connection.createChannel(function (error1, channel) {
        if (error1) {
          throw error1;
        }

        var queue = "queueEsporte";
        var msg = Buffer.from(JSON.stringify(myArr));

        channel.assertQueue(queue, {
          durable: false,
        });
        channel.sendToQueue(queue, Buffer.from(msg));

        console.log(" [x] Sent %s", msg);
      });
      setTimeout(function () {
        connection.close();
      }, 500);
    }
  );
  res.json({
    msg: "Esporte registrado com sucesso",
    status: true,
  });
});

router.post("/sport/update/", (req, res) => {
  const myArr = {
    typeReq: "updateReq",
    id: req.body.id,
    nome: req.body.nome,
    maxEquipe: req.body.maxEquipe,
  };

  amqp.connect(
    "amqps://ioulcnyy:L6Q9dUUOp-XjNfA6YV6QeoWd0s_rfR2B@jackal.rmq.cloudamqp.com/ioulcnyy",
    function (error0, connection) {
      if (error0) {
        throw error0;
      }
      connection.createChannel(function (error1, channel) {
        if (error1) {
          throw error1;
        }

        var queue = "queueEsporte";
        var msg = Buffer.from(JSON.stringify(myArr));

        channel.assertQueue(queue, {
          durable: false,
        });
        channel.sendToQueue(queue, Buffer.from(msg));

        console.log(" [x] Sent %s", msg);
      });
      setTimeout(function () {
        connection.close();
      }, 500);
    }
  );
  res.json({
    msg: "Esporte registrado com sucesso",
    status: true,
  });
});

router.get("/sport", (req, res) => {
  Esporte.findAll().then((sport) => {
    res.json({ sport: sport });
  });
});

router.get("/sport/:id", (req, res) => {
  Esporte.findByPk(req.params.id).then((sport) => {
    res.json({ sport: sport });
  });
});

router.get("/sports/check", (req, res) => {
  Esporte.findAll({
    attributes: ["nome"],
    where: {
      nome: req.body.nome,
    },
  })
    .then((sport) => {
      res.json(sport);
    })
    .catch((err) => {
      console.log(err);
      res.json({ msg: "Erro! Esporte não encontrada", detail: err });
    });
});

module.exports = router;
