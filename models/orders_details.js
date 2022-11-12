const { Sequelize ,DataTypes } = require('sequelize');
const sequelize = require('../config/db');


module.exports = (sequelize) => sequelize.define('orders_details', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    order_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'orders',
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    product_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'products',
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    price: Sequelize.INTEGER,
    quantity: Sequelize.INTEGER
},
{
    freezeTableName: true,
    timestamps: false
});