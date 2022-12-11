const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const connection = require("./database/database");
const cors = require("cors");
const webpush = require("web-push");
const pushData = require("./pushData/pushData");
const usuarioController = require("./Usuario/UsuarioController");
const esporteController = require("./Esporte/EsporteController");
const posicaoController = require("./Esporte/Posicao/PosicaoController");
const salaController = require("./Sala/SalaController");
const equipeController = require("./Equipe/EquipeController");
const eventoController = require("./Evento/EventoController");
const participanteController = require("./Sala/Participante/ParticipanteController");
const membroController = require("./Equipe/Membro/MembroController");
const integranteController = require("./Evento/Integrante/IntegranteController");
const fileController = require("./Files/FileController");

const pushDataController = require("./pushData/pushDataController");

const preparticipantController = require("./Sala/PreParticipante/PreParticipanteController");

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

app.use("/", usuarioController);
app.use("/", esporteController);
app.use("/", posicaoController);
app.use("/", salaController);
app.use("/", eventoController);
app.use("/", integranteController);
app.use("/", participanteController);
app.use("/", equipeController);
app.use("/", membroController);
app.use("/", fileController);
app.use("/", preparticipantController);

app.use("/", pushDataController);

const data = webpush.generateVAPIDKeys();

webpush.setVapidDetails(
  "mailto:test@test.com",
  data.publicKey,
  data.privateKey
);

pushData.create({
  publicKey: data.publicKey,
  privateKey: data.privateKey,
});

app.listen(process.env.PORT || 8080, () => {
  console.log("Servidor rodando");
});
