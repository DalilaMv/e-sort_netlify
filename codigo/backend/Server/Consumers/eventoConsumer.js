const Evento = require("../Models/Evento");
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

        var queue = "queueEvento";

        channel.assertQueue(queue, {
          durable: false,
        });

        channel.consume(
          queue,
          function (msg) {
            var data = JSON.parse(msg.content.toString());
            switch (data.typeReq) {
              case "saveReq":
                Evento.create({
                  nome: data.nome,
                  quantidade: data.quantidade,
                  textoesporte: data.textoesporte,
                  data: data.data,
                  quantidadeMax: data.quantidadeMax,
                  local: data.local,
                  valor: data.valor,
                  status: data.status,
                  usuarioId: data.usuarioId,
                  horaInicio: data.horaInicio,
                  horaFim: data.horaFim,
                  salaId: data.salaId,
                  esporteId: data.esporteId,
                });
                console.log("Evento Criado" + data.nome);
                break;
              case "deleteReq":
                Evento.destroy({
                  where: {
                    id: data.id,
                  },
                });
                console.log("Evento deletado" + data.nome);
                break;
              case "updateReq":
                if (!isNaN(data.id)) {
                  Evento.update(
                    {
                      nome: data.nome,
                      quantidade: data.quantidade,
                      textoesporte: data.textoesporte,
                      data: data.data,
                      quantidadeMax: data.quantidadeMax,
                      local: data.local,
                      valor: data.valor,
                      status: data.status,
                      usuarioId: data.usuarioId,
                      horaInicio: data.horaInicio,
                      horaFim: data.horaFim,
                      salaId: data.salaId,
                      esporteId: data.esporteId,
                    },
                    {
                      where: {
                        id: data.id,
                      },
                    }
                  );
                }
                console.log("Evento Atualizado" + data.nome);
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
