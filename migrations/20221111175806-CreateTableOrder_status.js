'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('order_status', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      status: Sequelize.INTEGER,
      description: Sequelize.STRING
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('order_status');
  }
};
