const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/databaseConnect'); 


class Ticket extends Model {}
Ticket.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      field: 'Id',
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
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },
  {
    sequelize,
    tableName: 'ticket',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    paranoid: true,
    deletedAt: 'deleted_at',
    underscored: true,
  },
);

module.exports = Ticket;
