'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tournament extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Event, Bracket, User }) {
      this.belongsTo(Event, {foreignKey: 'eventId', as: 'event'});
      this.hasOne(Bracket);
      this.hasMany(User, { foreignKey: 'tournamentId', as: 'users', onDelete: 'cascade', hooks: true });
    }
  }
  Tournament.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    time: {
      type: DataTypes.INTEGER,
      validate: {min: 0, max: 23}
    }
  }, {
    sequelize,
    modelName: 'Tournament',
  });
  return Tournament;
};