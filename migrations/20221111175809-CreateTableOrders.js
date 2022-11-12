'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('orders', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      customer_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'customers',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      ammount: Sequelize.INTEGER,
      shipping_address: Sequelize.STRING,
      order_address: Sequelize.STRING,
      order_email: Sequelize.STRING,
      order_date: Sequelize.STRING,
      order_status: {
        type: Sequelize.INTEGER,
        references: {
          model: 'order_status',
          key: 'id'
        },
        onDelete: 'CASCADE'
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('orders');
  }
};
