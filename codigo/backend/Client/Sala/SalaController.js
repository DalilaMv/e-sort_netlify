const express = require("express");
const router = express.Router();
const Sala = require("./Sala");
var amqp = require("amqplib/callback_api");

router.post("/room/save", (req, res) => {
  const myArr = {
    typeReq: "saveReq",
    nome: req.body.nome,
    descricao: req.body.descricao,
    esporte: req.body.esporte,
    numParticipantes: req.body.numParticipantes,
    cidade: req.body.cidade,
    usuarioId: req.body.usuarioId,
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

        var queue = "queueSala";
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

router.post("/room/delete/:id", (req, res) => {
  const myArr = { typeReq: "deleteReq", id: req.params.id };
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

        var queue = "queueSala";
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

router.post("/room/update/:id", (req, res) => {
  const myArr = {
    typeReq: "updateReq",
    id: req.params.id,
    nome: req.body.nome,
    descricao: req.body.descricao,
    esporte: req.body.esporte,
    numParticipantes: req.body.numParticipantes,
    cidade: req.body.cidade,
    usuarioId: req.body.usuarioId,
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

        var queue = "queueSala";
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

router.get("/room", (req, res) => {
  Sala.findAll().then((room) => {
    res.json({ room: room });
  });
});

router.get("/room/:id", (req, res) => {
  Sala.findByPk(req.params.id).then((room) => {
    res.json({ room: room });
  });
});

router.get("/rooms/last", (req, res) => {
  Sala.findOne({
    order: [["updatedAt", "DESC"]],
  })
    .then((room) => {
      res.json({ room });
    })
    .catch((err) => {
      res.json({ msg: "Erro encontrado", err });
    });
});

router.get("/rooms/check", (req, res) => {
  Sala.findAll({
    attributes: ["descricao"],
    where: {
      descricao: req.body.descricao,
    },
  })
    .then((room) => {
      res.json(room);
    })
    .catch((err) => {
      console.log(err);
      res.json({ msg: "Erro! Sala não encontrada", detail: err });
    });
});

router.get("/rooms/myroom/:id", (req, res) => {
  Sala.findAll({
    where: {
      usuarioId: req.params.id,
    },
  })
    .then((room) => {
      res.json(room);
    })
    .catch((err) => {
      console.log(err);
      res.json({ msg: "Erro! Sala não encontrada", detail: err });
    });
});

router.get("/rooms/notifications/:id", (req, res) => {
  Sala.findAll({
    attributes: ["id"],
    where: {
      usuarioId: req.params.id,
    },
  }).then((resp) => {
    res.json(resp);
  });
});

module.exports = router;
