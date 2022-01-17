'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: { len: [3,20] }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: "Email address is not valid!"
          }
        }
      },
      elo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1600
      },
      region: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'EU',
        validate: {
          enumCheck(value){
            if(value != 'EU' || value != 'NA' || value != 'SEA' || value != 'LATAM' || value != 'AUS' || value != 'AFR')
              throw new Error('Only EU/NA/SEA/LATAM/AUS/AFR options allowed!');
          }
        }
      },
      banned: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      tournamentId: {
        type: Sequelize.INTEGER,
        allowNull:true,

      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};