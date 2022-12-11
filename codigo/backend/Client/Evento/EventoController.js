const express = require("express");
const router = express.Router();
const Evento = require("./Evento");
var amqp = require("amqplib/callback_api");
router.post("/event/save", (req, res) => {
  const myArr = {
    typeReq: "saveReq",
    nome: req.body.nome,
    quantidade: req.body.quantidade,
    textoesporte: req.body.textoesporte,
    data: req.body.data,
    quantidadeMax: req.body.quantidadeMax,
    local: req.body.local,
    valor: req.body.valor,
    status: req.body.status,
    usuarioId: req.body.usuarioId,
    salaId: req.body.salaId,
    esporteId: req.body.esporteId,
    horaInicio: req.body.horaInicio,
    horaFim: req.body.horaFim,
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

        var queue = "queueEvento";
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

router.post("/event/delete/:id", (req, res) => {
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

        var queue = "queueEvento";
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

router.post("/event/update/:id", (req, res) => {
  const myArr = {
    typeReq: "updateReq",
    id: req.params.id,
    nome: req.body.nome,
    quantidade: req.body.quantidade,
    textoesporte: req.body.textoesporte,
    data: req.body.data,
    quantidadeMax: req.body.quantidadeMax,
    local: req.body.local,
    valor: req.body.valor,
    status: req.body.status,
    horaInicio: req.body.horaInicio,
    horaFim: req.body.horaFim,
    usuarioId: req.body.usuarioId,
    salaId: req.body.salaId,
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

        var queue = "queueEvento";
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

router.get("/event", (req, res) => {
  Evento.findAll().then((event) => {
    res.json({ event: event });
  });
});

router.get("/event/:id", (req, res) => {
  Evento.findByPk(req.params.id).then((event) => {
    res.json({ event: event });
  });
});

router.get("/events/checkRoom/:id", (req, res) => {
  Evento.findAll({
    // attributes: ["nome"],
    where: {
      usuarioId: req.params.id,
    },
  })
    .then((event) => {
      res.json(event);
    })
    .catch((err) => {
      console.log(err);
      res.json({ msg: "Erro! Evento não encontrada", detail: err });
    });
});

router.get("/events/checkDono/:id", (req, res) => {
  Evento.findAll({
    where: {
      salaId: req.params.id,
    },
  })
    .then((event) => {
      res.json(event);
    })
    .catch((err) => {
      console.log(err);
      res.json({ msg: "Erro! Evento não encontrada", detail: err });
    });
});

module.exports = router;
