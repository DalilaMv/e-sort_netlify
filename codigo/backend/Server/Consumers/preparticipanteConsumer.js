const PreParticipante = require("../Models/PreParticipante");
const Participante = require("../Models/Participante");
var amqp = require("amqplib/callback_api");

exports.consumerData = async function consumerData() {
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

        channel.assertQueue(queue, {
          durable: false,
        });

        channel.consume(
          queue,
          function (msg) {
            var data = JSON.parse(msg.content.toString());
            switch (data.typeReq) {
              case "saveReq":
                PreParticipante.create({
                  nome: data.nome,
                  userId: data.userId,
                  salaId: data.salaId,
                  donoId: data.donoId,
                });
                console.log("PreParticipante Criado" + data.nome);
                break;
              case "deleteReq":
                PreParticipante.destroy({
                  where: {
                    id: data.id,
                  },
                });
                console.log("PreParticipante deletado" + data.nome);
                break;
              case "updateReq":
                if (!isNaN(data.id)) {
                  PreParticipante.update(
                    {
                      nome: data.nome,
                      userId: data.userId,
                      salaId: data.salaId,
                      donoId: data.donoId,
                    },
                    {
                      where: {
                        id: data.id,
                      },
                    }
                  );
                }
                console.log("PreParticipante Atualizado" + data.nome);
                break;
              case "acceptReq":
                if (data.nome != undefined) {
                  PreParticipante.destroy({
                    where: {
                      id: data.id,
                    },
                  });
                  Participante.create({
                    nome: data.nome,
                    userId: data.userId,
                    salaId: data.salaId,
                  }).then(() => {
                    res.json({
                      msg: "Sucesso",
                      status: true,
                    });
                  });
                }
                break;
              case "rejectReq":
                PreParticipante.destroy({
                  where: {
                    id: data.id,
                  },
                });
                break;
            }
          },
          {
            noAck: true,
          }
        );
      });
      setTimeout(function () {
        connection.close();
      }, 1000);
    }
  );
};
