const Sequelize = require("sequelize");
const connection = require("../database/database");
const Evento = require("../Evento/Evento");

//Tesye

const Equipe = connection.define("equipe", {
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  idLivre: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
});

Evento.hasMany(Equipe);
Equipe.belongsTo(Evento);

Equipe.sync({ force: false });

module.exports = Equipe;
