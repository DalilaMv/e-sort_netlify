const Integrante = require("../Models/Integrante");
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

        var queue = "queueIntegrante";

        channel.assertQueue(queue, {
          durable: false,
        });

        channel.consume(
          queue,
          function (msg) {
            var data = JSON.parse(msg.content.toString());
            switch (data.typeReq) {
              case "saveReq":
                Integrante.create({
                  nome: data.nome,
                  usuarioId: data.usuarioId,
                  eventoId: data.eventoId,
                });
                console.log("Integrante Criado" + data.nome);
                break;
              case "deleteReq":
                Integrante.destroy({
                  where: {
                    id: data.id,
                  },
                });
                console.log("Integrante deletado" + data.nome);
                break;
              case "updateReq":
                if (!isNaN(data.id)) {
                  Integrante.update(
                    {
                      nome: data.nome,
                      usuarioId: data.usuarioId,
                      eventoId: data.eventoId,
                    },
                    {
                      where: {
                        id: data.id,
                      },
                    }
                  );
                }
                console.log("Integrante Atualizado" + data.nome);
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
