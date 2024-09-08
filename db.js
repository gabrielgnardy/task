const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(process.env.MYSQL_DB, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
  host: process.env.MYSQL_HOST,
  dialect: 'mysql',
});

sequelize.authenticate()
  .then(() => console.log('MySQL connected...'))
  .catch((err) => console.error('Error connecting to MySQL:', err));

module.exports = sequelize;
