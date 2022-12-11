const Sequelize = require("sequelize");
const connection = require("../database/database");

const pushData = connection.define("pushdata", {
  publicKey: {
    type: Sequelize.STRING,
  },
  privateKey: {
    type: Sequelize.STRING,
  },
});

pushData.sync({ force: false });

module.exports = pushData;
