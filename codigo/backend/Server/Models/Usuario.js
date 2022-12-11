const Sequelize = require("sequelize");
const connection = require("../database/database");

const Usuario = connection.define("usuario", {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  senha: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  idade: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  genero: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

console.log("connection");

Usuario.sync({ force: false });

module.exports = Usuario;
