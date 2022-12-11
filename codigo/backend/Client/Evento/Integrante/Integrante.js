const Sequelize = require("sequelize");
const connection = require("../../database/database");
const Usuario = require("../../Usuario/Usuario");
const Evento = require("../Evento");

const Integrante = connection.define("integrante", {
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});


Usuario.hasMany(Integrante);
Integrante.belongsTo(Usuario);

Evento.hasMany(Integrante);
Integrante.belongsTo(Evento);

Integrante.sync({ force: true });

module.exports = Integrante;
