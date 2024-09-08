const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');

const Task = sequelize.define('Task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  completedDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

Task.belongsTo(User, { foreignKey: 'userId' });

module.exports = Task;