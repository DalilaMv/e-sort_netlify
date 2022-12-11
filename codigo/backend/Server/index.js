const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const connection = require("./database/database");
const cors = require("cors");
const esporteConsumer = require("./Consumers/esporteConsumer");
const salaConsumer = require("./Consumers/salaConsumer");
const eventoConsumer = require("./Consumers/eventoConsumer");
const equipeConsumer = require("./Consumers/equipeConsumer");
const integranteConsumer = require("./Consumers/integranteConsumer");
const membroConsumer = require("./Consumers/membroConsumer");
const participanteConsumer = require("./Consumers/participanteConsumer");
const posicaoConsumer = require("./Consumers/posicaoConsumer");
const preparticipantConsumer = require("./Consumers/preparticipanteConsumer");

app.use((req, res, next) => {
  //Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
  res.header("Access-Control-Allow-Origin", "*");
  //Quais são os métodos que a conexão pode realizar na API
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Content-Type, X-Auth-Token"
  );
  app.use(cors());
  app.use(express.json());
  next();
});
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

connection
  .authenticate()
  .then(() => {
    console.log("Conexão feita com sucesso!!");
  })
  .catch((error) => {
    console.log(error);
  });

setInterval(() => esporteConsumer.consumerData(), 15000);
setInterval(() => posicaoConsumer.consumerData(), 15000);
setInterval(() => salaConsumer.consumerData(), 15000);
setInterval(() => eventoConsumer.consumerData(), 15000);
setInterval(() => equipeConsumer.consumerData(), 15000);
setInterval(() => integranteConsumer.consumerData(), 15000);
setInterval(() => membroConsumer.consumerData(), 15000);
setInterval(() => participanteConsumer.consumerData(), 15000);
setInterval(() => preparticipantConsumer.consumerData(), 15000);

app.listen(process.env.PORT || 8081, () => {
  console.log("Servidor rodando");
});
