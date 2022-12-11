const Sequelize = require("sequelize");
const connection = require("../database/database");

const Esporte = connection.define("esporte", {
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  maxEquipe: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

Esporte.sync({ force: false });

module.exports = Esporte;
