const Equipe = require("../Models/Equipe");
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

        var queue = "queueEquipe";

        channel.assertQueue(queue, {
          durable: false,
        });

        channel.consume(
          queue,
          function (msg) {
            var data = JSON.parse(msg.content.toString());
            switch (data.typeReq) {
              case "saveReq":
                Equipe.create({
                  nome: data.nome,
                  idLivre: data.idLivre,
                  eventoId: data.eventoId,
                });
                console.log("Equipe Criado" + data.nome);
                break;
              case "deleteReq":
                Equipe.destroy({
                  where: {
                    id: data.id,
                  },
                });
                console.log("Equipe deletado" + data.nome);
                break;
              case "updateReq":
                if (!isNaN(data.id)) {
                  Equipe.update(
                    {
                      nome: data.nome,
                      idLivre: data.idLivre,
                      eventoId: data.eventoId,
                    },
                    {
                      where: {
                        id: data.id,
                      },
                    }
                  );
                }
                console.log("Equipe Atualizado" + data.nome);
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
