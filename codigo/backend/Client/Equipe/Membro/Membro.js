const Sequelize = require("sequelize");
const connection = require("../../database/database");
const Equipe = require("../Equipe");

const Membro = connection.define("membro", {
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  userId: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

Equipe.hasMany(Membro);
Membro.belongsTo(Equipe);

Membro.sync({ force: false });

module.exports = Membro;
