const Sequelize = require("sequelize");
const connection = require("../database/database");
const Esporte = require("./Esporte");

const Posicao = connection.define("posicao", {
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

Esporte.hasMany(Posicao);
Posicao.belongsTo(Esporte);

Posicao.sync({ force: false });

module.exports = Posicao;
