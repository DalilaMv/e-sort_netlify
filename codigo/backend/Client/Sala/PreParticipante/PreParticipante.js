const Sequelize = require("sequelize");
const connection = require("../../database/database");
const Sala = require("../Sala");

const PreParticipante = connection.define("preparticipante", {
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  userId: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  donoId: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

Sala.hasMany(PreParticipante);
PreParticipante.belongsTo(Sala);

PreParticipante.sync({ force: false });

module.exports = PreParticipante;
