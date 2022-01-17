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
    static associate({ Tournament }) {
      this.belongsTo(Tournament);
    }
  }
  Bracket.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { 
        enumCheck(value){
          if(value != 'S' || value != 'D' || value != 'RR')
            throw new Error('Only S - Single Elimination, D - Double Elimination, RR - Round Robin options allowed!');
        }
      }
    },
    size: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 0 }
    },
    reserved: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
  }, {
    sequelize,
    modelName: 'Bracket',
  });
  return Bracket;
};