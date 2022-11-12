'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('sellers', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      username: Sequelize.STRING,
      email: Sequelize.STRING,
      password: Sequelize.STRING,
      full_name: Sequelize.STRING,
      account: Sequelize.STRING
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('sellers')
  }
};
