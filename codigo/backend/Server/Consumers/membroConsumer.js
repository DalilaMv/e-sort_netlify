const Membro = require("../Models/Membro");
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

        var queue = "queueMembro";

        channel.assertQueue(queue, {
          durable: false,
        });

        channel.consume(
          queue,
          function (msg) {
            var data = JSON.parse(msg.content.toString());
            switch (data.typeReq) {
              case "saveReq":
                Membro.create({
                  nome: data.nome,
                  userId: data.userId,
                  equipeId: data.equipeId,
                });
                console.log("Membro Criado" + data.nome);
                break;
              case "deleteReq":
                Membro.destroy({
                  where: {
                    id: data.id,
                  },
                });
                console.log("Membro deletado" + data.nome);
                break;
              case "updateReq":
                if (!isNaN(data.id)) {
                  Membro.update(
                    {
                      nome: data.nome,
                      userId: data.userId,
                      equipeId: data.equipeId,
                    },
                    {
                      where: {
                        id: data.id,
                      },
                    }
                  );
                }
                console.log("Membro Atualizado" + data.nome);
                break;
              case "sortReq":
                var participantList = data.participantes;
                var equipeList = data.equipes;
                var maxEquipe = data.maxEquipe;

                if (participantList.length > 0) {
                  do {
                    var random = Math.floor(Math.random() * equipeList.length);
                    var equipe = equipeList[random];

                    for (let i = 0; i < maxEquipe; i++) {
                      var temp =
                        participantList[
                          Math.floor(Math.random() * participantList.length)
                        ];

                      var nome = temp.nome;
                      var userId = temp.userId;
                      var equipeId = equipe;

                      if (nome != undefined) {
                        Membro.create({
                          nome: nome,
                          userId: userId,
                          equipeId: equipeId,
                        });
                      }
                      participantList = participantList.filter(
                        (item) => item !== temp
                      );
                    }
                    Equipe.update(
                      { idLivre: false },
                      {
                        where: {
                          id: equipe,
                        },
                      }
                    );
                    equipeList = equipeList.filter((item) => item !== equipe);
                  } while (equipeList.length > 0);
                }
                console.log("Membro deletado" + data.nome);
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
