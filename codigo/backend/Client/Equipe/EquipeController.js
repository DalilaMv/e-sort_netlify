const express = require("express");
const router = express.Router();
const Equipe = require("./Equipe");
var amqp = require("amqplib/callback_api");

router.post("/team/save", (req, res) => {
  const myArr = {
    typeReq: "saveReq",
    nome: req.body.nome,
    idLivre: req.body.idLivre,
    eventoId: req.body.eventoId,
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

        var queue = "queueEquipe";
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
    msg: "Sucesso",
    status: true,
  });
});

router.post("/team/delete/:id", (req, res) => {
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

        var queue = "queueEquipe";
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
    msg: "Sucesso",
    status: true,
  });
});

router.post("/team/update/:id", (req, res) => {
  const myArr = {
    typeReq: "updateReq",
    id: req.params.id,
    nome: req.body.nome,
    idLivre: req.body.idLivre,
    eventoId: req.body.eventoId,
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

        var queue = "queueEquipe";
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
    msg: "Sucesso",
    status: true,
  });
});

router.get("/team", (req, res) => {
  Equipe.findAll().then((team) => {
    res.json({ team: team });
  });
});

router.get("/team/:id", (req, res) => {
  Equipe.findByPk(req.params.id).then((team) => {
    res.json({ team: team });
  });
});

router.get("/teams/checkFree", (req, res) => {
  Equipe.findAll({
    attributes: ["nome"],
    where: {
      idLivre: req.body.idLivre,
    },
  })
    .then((team) => {
      res.json(team);
    })
    .catch((err) => {
      console.log(err);
      res.json({ msg: "Erro! Equipes não encontradas", detail: err });
    });
});

module.exports = router;
