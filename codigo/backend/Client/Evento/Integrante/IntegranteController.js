const express = require("express");
const router = express.Router();
const Integrante = require("./Integrante");
const Evento = require("../Evento");
const Usuario = require("../../Usuario/Usuario");
var amqp = require("amqplib/callback_api");
const { response } = require("express");

router.post("/integrant/save", (req, res) => {
  const myArr = {
    typeReq: "saveReq",
    nome: req.body.nome,
    usuarioId: req.body.usuarioId,
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

        var queue = "queueIntegrante";
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

router.post("/integrant/delete/:id", (req, res) => {
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

        var queue = "queueIntegrante";
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

router.post("/integrant/update/:id", (req, res) => {
  const myArr = {
    typeReq: "updateReq",
    id: req.params.id,
    nome: req.body.nome,
    usuarioId: req.body.usuarioId,
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

        var queue = "queueIntegrante";
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

router.get("/integrant", (req, res) => {
  Integrante.findAll().then((integrant) => {
    res.json({ integrant: integrant });
  });
});

router.get("/integrant/:id", (req, res) => {
  Integrante.findByPk(req.params.id).then((integrant) => {
    res.json({ integrant: integrant });
  });
});

router.get("/integrants/checkName", (req, res) => {
  Integrante.findAll({
    attributes: ["nome"],
    where: {
      nome: req.body.nome,
    },
  })
    .then((integrant) => {
      res.json(integrant);
    })
    .catch((err) => {
      console.log(err);
      res.json({ msg: "Erro! Integrante não encontrada", detail: err });
    });
});

router.post("/integrants/verify-room", (req, res) => {
  Integrante.findAll({
    where: {
      usuarioId: req.body.usuarioId,
      eventoId: req.body.eventoId,
    },
  }).then((integrante) => {
    res.json(integrante)
  }).catch((err) => {
    console.log(err);
    res.json({ msg: "Erro! Integrantes não encontrados", detail: err });
  })
})

router.get("/integrants/events/:id", (req, res) => {
  Integrante.findAll({
    where: {
      eventoId: req.params.id,
    },
    include: [
      {
        model: Usuario,
        as: "usuario",
      },
    ],
  })
    .then((integrant) => {
      res.json(integrant);
    })
    .catch((err) => {
      console.log(err);
      res.json({ msg: "Erro! Integrantes não encontrados", detail: err });
    });
});

router.get("/integrants/checkIntegrantsEvents/:id", (req, res) => {
  Integrante.findAll({
    where: {
      usuarioId: req.params.id,
    },
    include: [
      {
        model: Evento,
        as: "evento",
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

module.exports = router;
