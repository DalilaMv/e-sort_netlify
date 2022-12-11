const Sequelize = require("sequelize");
const connection = require("../database/database");
const User = require("../Usuario/Usuario");

const Sala = connection.define("sala", {
  nome: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  descricao: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  esporte: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  numParticipantes: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  cidade: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  idArquivo: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
});

User.hasMany(Sala);
Sala.belongsTo(User);

Sala.sync({ force: false });

module.exports = Sala;
