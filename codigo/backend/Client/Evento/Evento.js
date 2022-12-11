const Sequelize = require("sequelize");
const connection = require("../database/database");
const Sala = require("../Sala/Sala");
const Esporte = require("../Esporte/Esporte");
const User = require("../Usuario/Usuario");

const Evento = connection.define("evento", {
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  data: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  textoesporte: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  quantidade: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  quantidadeMax: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  horaInicio: {
    type: Sequelize.TIME,
    allowNull: true,
  },
  horaFim: {
    type: Sequelize.TIME,
    allowNull: true,
  },
  local: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  valor: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  status: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

Esporte.hasMany(Evento);
Evento.belongsTo(Esporte);

Sala.hasMany(Evento);
Evento.belongsTo(Sala);

User.hasMany(Evento);
Evento.belongsTo(User);

Evento.sync({ force: false });

module.exports = Evento;
