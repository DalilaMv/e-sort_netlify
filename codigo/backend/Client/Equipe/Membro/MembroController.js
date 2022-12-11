const express = require("express");
const router = express.Router();
const Membro = require("./Membro");
var amqp = require("amqplib/callback_api");
router.post("/member/save", (req, res) => {
  const myArr = {
    typeReq: "saveReq",
    nome: req.body.nome,
    userId: req.body.userId,
    equipeId: req.body.equipeId,
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

        var queue = "queueMembro";
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

router.post("/member/delete/:id", (req, res) => {
  const myArr = {
    typeReq: "deleteReq",
    id: req.params.id,
  };
  if (myArr.nome != undefined) {
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

          var queue = "queueMembro";
          var msg = Buffer.from(JSON.stringify(myArr));

          channel.assertQueue(queue, {
            durable: false,
          });
          channel.sendToQueue(queue, Buffer.from(msg));

          console.log(" [x] Sent %s", msg);
        });
        setTimeout(function () {
          connection.close();
        }, 100);
      }
    );

    res.json({
      msg: "Sucesso",
      status: true,
    });
  } else {
    res.json({ msg: "Erro ao registrar Membro", status: false });
  }
});

router.post("/member/update/", (req, res) => {
  const myArr = {
    typeReq: "updateReq",
    id: req.params.id,
    nome: req.body.nome,
    userId: req.body.userId,
    equipeId: req.body.equipeId,
  };
  if (myArr.nome != undefined) {
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

          var queue = "queueMembro";
          var msg = Buffer.from(JSON.stringify(myArr));

          channel.assertQueue(queue, {
            durable: false,
          });
          channel.sendToQueue(queue, Buffer.from(msg));

          console.log(" [x] Sent %s", msg);
        });
        setTimeout(function () {
          connection.close();
        }, 100);
      }
    );

    res.json({
      msg: "Sucesso",
      status: true,
    });
  }
});

router.post("/member/sort/save", (req, res) => {
  const myArr = {
    typeReq: "sortReq",
    participantList: req.body.participantes,
    equipeList: req.body.equipes,
    maxEquipe: req.body.maxEquipe,
  };

  if (myArr.participantList.length > 0) {
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

          var queue = "queueMembro";
          var msg = Buffer.from(JSON.stringify(myArr));

          channel.assertQueue(queue, {
            durable: false,
          });
          channel.sendToQueue(queue, Buffer.from(msg));

          console.log(" [x] Sent %s", msg);
        });
        setTimeout(function () {
          connection.close();
        }, 100);
      }
    );

    res.json({
      msg: "Sucesso",
      status: true,
    });
    res.json({ msg: "Membros registrada com sucesso", status: true });
  } else {
    res.json({ msg: "Erro ao registrar Membro", status: false });
  }
});

router.get("/member", (req, res) => {
  Membro.findAll().then((member) => {
    res.json({ member: member });
  });
});

router.get("/member/:id", (req, res) => {
  Membro.findByPk(req.params.id).then((member) => {
    res.json({ member: member });
  });
});

router.get("/members/checkName", (req, res) => {
  Membro.findAll({
    attributes: ["nome"],
    where: {
      nome: req.body.nome,
    },
  })
    .then((member) => {
      res.json(member);
    })
    .catch((err) => {
      console.log(err);
      res.json({ msg: "Erro! Membro não encontrada", detail: err });
    });
});

router.get("/members/team/:id", (req, res) => {
  Membro.findAll({
    attributes: ["userId", "nome"],
    where: {
      equipeId: req.params.id,
    },
  })
    .then((member) => {
      res.json(member);
    })
    .catch((err) => {
      console.log(err);
      res.json({ msg: "Erro! Membros não encontrados", detail: err });
    });
});

module.exports = router;
