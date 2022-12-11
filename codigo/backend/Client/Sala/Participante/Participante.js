const Sequelize = require("sequelize");
const connection = require("../../database/database");
const Sala = require("../Sala");

const Participante = connection.define("participante", {
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  userId: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

Sala.hasMany(Participante);
Participante.belongsTo(Sala);

Participante.sync({ force: false });

module.exports = Participante;
