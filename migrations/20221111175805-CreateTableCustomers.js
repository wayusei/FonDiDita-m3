'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('customers', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      username: Sequelize.STRING,
      email: Sequelize.STRING,
      password: Sequelize.STRING,
      full_name: Sequelize.STRING,
      billing_address: Sequelize.STRING,
      default_shipping_address: Sequelize.STRING,
      phone: Sequelize.INTEGER
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('customers');
  }
};
