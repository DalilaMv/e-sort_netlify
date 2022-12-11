const Posicao = require("../Models/Posicao");
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

        var queue = "queuePosicao";

        channel.assertQueue(queue, {
          durable: false,
        });

        channel.consume(
          queue,
          function (msg) {
            var data = JSON.parse(msg.content.toString());
            switch (data.typeReq) {
              case "saveReq":
                Posicao.create({
                  nome: data.nome,
                  idEsporte: data.idEsporte,
                });
                console.log("Posicao Criado" + data.nome);
                break;
              case "deleteReq":
                Posicao.destroy({
                  where: {
                    id: data.id,
                  },
                });
                console.log("Posicao deletado" + data.nome);
                break;
              case "updateReq":
                if (!isNaN(data.id)) {
                  Posicao.update(
                    { nome: data.nome, idEsporte: data.idEsporte },
                    {
                      where: {
                        id: data.id,
                      },
                    }
                  );
                }
                console.log("Posicao Atualizado" + data.nome);
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
