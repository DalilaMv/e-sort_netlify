const Sequelize = require("sequelize");

const connection = new Sequelize({
  database: "tisdatabase_rdn4",
  username: "tisuser",
  password: "4ykEtJaXuGT2IY5sp6XOZIv1sZ6o3TEN",
  host: "dpg-ce5scoda4991uetnssj0-a.oregon-postgres.render.com",
  port: 5432,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
    ssl: true,
  },
});
module.exports = connection;
