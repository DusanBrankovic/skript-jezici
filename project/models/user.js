'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Tournament }) {
      this.belongsTo(Tournament, {foreignKey: 'tournamentId', as: 'tournament'});
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { len: [3,20] }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Email address is not valid!"
        }
      }
    },
    elo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1600
    },
    region: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'EU',
      validate: { 
        enumCheck(value){
          if(value != 'EU' && value != 'NA' && value != 'SEA' && value != 'LATAM' && value != 'AUS' && value != 'AFR')
            throw new Error('Only EU/NA/SEA/LATAM/AUS/AFR options allowed!');
        }
      }
    },
    banned: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false  
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};