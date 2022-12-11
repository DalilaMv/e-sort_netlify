const Sequelize = require("sequelize");
const connection = require("../database/database");

const File = connection.define("file", {
  type: {
    type: Sequelize.STRING,
  },
  name: {
    type: Sequelize.STRING,
  },
  data: {
    type: Sequelize.BLOB("long"),
  },
});

File.sync({ force: false });

module.exports = File;
