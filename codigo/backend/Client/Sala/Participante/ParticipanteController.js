const express = require("express");
const router = express.Router();
const Participante = require("./Participante");
const Sala = require("../Sala");
var amqp = require("amqplib/callback_api");
router.post("/participant/save", (req, res) => {
  const myArr = {
    typeReq: "saveReq",
    nome: req.body.nome,
    userId: req.body.userId,
    salaId: req.body.salaId,
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

        var queue = "queueParticipante";
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

router.post("/participant/delete/:id", (req, res) => {
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

        var queue = "queueParticipante";
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

router.post("/participant/update/:id", (req, res) => {
  const myArr = {
    typeReq: "updateReq",
    id: req.params.id,
    nome: req.body.nome,
    userId: req.body.userId,
    salaId: req.body.salaId,
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

        var queue = "queueParticipante";
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

router.get("/participant", (req, res) => {
  Participante.findAll().then((participant) => {
    res.json({ participant: participant });
  });
});

router.get("/participants/checkParticipantRoom/:id", (req, res) => {
  Participante.findAll({
    where: {
      userId: req.params.id,
    },
    include: [
      {
        model: Sala,
        as: "sala",
      },
    ],
  })
    .then((participant) => {
      res.json(participant);
    })
    .catch((err) => {
      console.log(err);
      res.json({ msg: "Erro! Participante não encontrada", detail: err });
    });
});

router.get("/participant/:id", (req, res) => {
  Participante.findByPk(req.params.id).then((participant) => {
    res.json({ participant: participant });
  });
});

router.get("/participants/checkUser/:id", (req, res) => {
  Participante.findAll({
    where: {
      userId: req.params.id,
    },
  })
    .then((participant) => {
      res.json(participant);
    })
    .catch((err) => {
      console.log(err);
      res.json({ msg: "Erro! Participante não encontrada", detail: err });
    });
});

router.get("/participants/rooms/:id", (req, res) => {
  Participante.findAll({
    attributes: ["userId", "nome"],
    where: {
      salaId: req.params.id,
    },
  })
    .then((participant) => {
      res.json(participant);
    })
    .catch((err) => {
      console.log(err);
      res.json({ msg: "Erro! Participantes não encontrados", detail: err });
    });
});

module.exports = router;
