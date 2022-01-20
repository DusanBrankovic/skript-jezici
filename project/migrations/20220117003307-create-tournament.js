'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tournaments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      time: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      eventId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      bracketId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: -1
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
    await queryInterface.dropTable('Tournaments');
  }
};