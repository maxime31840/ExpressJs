const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/databaseConnect'); 

const Ticket = sequelize.define('Ticket', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE, 
    allowNull: false,
    defaultValue: Sequelize.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  responded_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  closed_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
   message: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  tech_responses: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  priority: {
    type: DataTypes.ENUM('low', 'medium', 'high', 'critical'), 
    allowNull: false,
    defaultValue: 'medium'
  },
  status: {
    type: DataTypes.ENUM('open', 'assigned', 'respoded', 'closed'),
    allowNull: false,
    defaultValue: 'open'
  },
}, {
  tableName: 'ticket', 
  timestamps: false
});

module.exports = Ticket;
