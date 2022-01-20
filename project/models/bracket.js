'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bracket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate({ Tournament }) {
    //   this.belongsTo(Tournament);
    // }
  }
  Bracket.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    size: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    reserved: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    tournamentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: -1
    }
  }, {
    sequelize,
    modelName: 'Bracket',
  });
  return Bracket;
};