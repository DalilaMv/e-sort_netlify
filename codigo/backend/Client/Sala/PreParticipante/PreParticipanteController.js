const express = require("express");
const router = express.Router();
const PreParticipante = require("./PreParticipante");
const Sala = require("../Sala");
var amqp = require("amqplib/callback_api");
const webpush = require("web-push");
router.post("/preparticipant/save", (req, res) => {
  const myArr = {
    typeReq: "saveReq",
    nome: req.body.nome,
    userId: req.body.userId,
    salaId: req.body.salaId,
    donoId: req.body.donoId,
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

        var queue = "queuePreParticipante";
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

router.post("/preparticipant/delete/:id", (req, res) => {
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

        var queue = "queuePreParticipante";
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

router.post("/preparticipant/accept/:id", (req, res) => {
  const myArr = {
    typeReq: "acceptReq",
    id: req.params.id,
    nome: req.body.nome,
    userId: req.body.userId,
    salaId: req.body.salaId,
    donoId: req.body.donoId,
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

        var queue = "queuePreParticipante";
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

router.post("/preparticipant/reject/:id", (req, res) => {
  const myArr = {
    typeReq: "rejectReq",
    id: req.params.id,
    nome: req.body.nome,
    userId: req.body.userId,
    salaId: req.body.salaId,
    donoId: req.body.donoId,
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

        var queue = "queuePreParticipante";
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

router.post("/preparticipant/update/:id", (req, res) => {
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

        var queue = "queuePreParticipante";
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

router.get("/preparticipant", (req, res) => {
  PreParticipante.findAll().then((participant) => {
    res.json({ participant: participant });
  });
});

// router.get("/preparticipant/number/:id", (req, res) => {
//   PreParticipante.count({ where: { donoId: req.params.id } }).then((count) => {
//     res.json({ count: count });
//   });
// });

router.post("/preparticipant/number/", (req, res) => {
  const myArr = {
    donoId: (req.body.donoId).toString(),
    salaId: (req.body.salaId).toString()
  };
  PreParticipante.count({ where: { donoId: myArr.donoId, salaId: myArr.salaId} }).then((count) => {
    res.json({ count: count });
  });
});

router.get("/preparticipant/:id", (req, res) => {
  PreParticipante.findByPk(req.params.id).then((participant) => {
    res.json({ participant: participant });
  });
});

router.get("/preparticipants/checkUser/:id", (req, res) => {
  PreParticipante.findAll({
    where: {
      userId: req.params.id,
    },
  })
    .then((participant) => {
      res.json(participant);
    })
    .catch((err) => {
      console.log(err);
      res.json({ msg: "Erro! PreParticipante não encontrada", detail: err });
    });
});

router.get("/preparticipants/rooms/:id", (req, res) => {
  PreParticipante.findAll({
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
      res.json({ msg: "Erro! PreParticipantes não encontrados", detail: err });
    });
});

router.post("/preparticipants/notification/:id", (req, res) => {
  const subscription = req.body;

  res.status(201).json({});
  PreParticipante.count({ where: { donoId: req.params.id } }).then((info) => {
    console.log(info);
    if (info > 0) {
      const payload = JSON.stringify({
        title: "!!!Usuario pendentes!!!",
        body: "Existem " + info + " usuarios pendentes a serem aceitos",
      });
      webpush.sendNotification(subscription, payload);
    }
  });
});

module.exports = router;
