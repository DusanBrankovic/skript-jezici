'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Tournament }) {
      this.hasMany(Tournament, { foreignKey: 'eventId', as: 'event', onDelete: 'CASCADE', hooks: true });
    }
  }
  Event.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    dateFrom: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    dateTo: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};