const express = require("express");
const router = express.Router();
const Posicao = require("./Posicao");
var amqp = require("amqplib/callback_api");
router.post("/position/save", (req, res) => {
  const myArr = {
    typeReq: "saveReq",
    nome: req.body.nome,
    esporteId: req.body.esporteId,
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

        var queue = "queuePosicao";
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

router.post("/position/delete/:id", (req, res) => {
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

        var queue = "queuePosicao";
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

router.post("/position/update/:id", (req, res) => {
  const myArr = {
    typeReq: "updateReq",
    id: req.params.id,
    nome: req.body.nome,
    esporteId: req.body.esporteId,
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

        var queue = "queuePosicao";
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

router.get("/position", (req, res) => {
  Posicao.findAll().then((position) => {
    res.json({ position: position });
  });
});

router.get("/position/:id", (req, res) => {
  Posicao.findByPk(req.params.id).then((position) => {
    res.json({ position: position });
  });
});

router.get("/positions/check", (req, res) => {
  Posicao.findAll({
    attributes: ["nome"],
    where: {
      nome: req.body.nome,
    },
  })
    .then((position) => {
      res.json(position);
    })
    .catch((err) => {
      console.log(err);
      res.json({ msg: "Erro! Posicao não encontrada", detail: err });
    });
});

module.exports = router;
