const Esporte = require("../Models/Esporte");
const amqp = require("amqplib/callback_api");

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

        var queue = "queueEsporte";

        channel.assertQueue(queue, {
          durable: false,
        });

        channel.consume(
          queue,
          function (msg) {
            var data = JSON.parse(msg.content.toString());
            switch (data.typeReq) {
              case "saveReq":
                Esporte.create({
                  nome: data.nome,
                  maxEquipe: data.maxEquipe,
                });
                console.log("Esporte Criado" + data.nome);
                break;
              case "deleteReq":
                Esporte.destroy({
                  where: {
                    id: data.id,
                  },
                });
                console.log("Esporte deletado" + data.nome);
                break;
              case "updateReq":
                if (!isNaN(data.id)) {
                  Esporte.update(
                    { nome: data.nome, maxEquipe: data.maxEquipe },
                    {
                      where: {
                        id: data.id,
                      },
                    }
                  );
                }
                console.log("Esporte Atualizado" + data.nome);
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
