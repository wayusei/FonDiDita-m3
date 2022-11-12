'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: Sequelize.STRING,
      price: Sequelize.INTEGER,
      description: Sequelize.STRING,
      image: Sequelize.STRING,
      thumbnail: Sequelize.STRING,
      category: {
        type: Sequelize.INTEGER,
        references: {
          model: 'categories',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      seller_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'sellers',
          key: 'id'
        },
        onDelete: 'CASCADE'
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('products')
  }
};
