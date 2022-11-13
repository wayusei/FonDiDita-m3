const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => sequelize.define('orders', {
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
},
{
    freezeTableName: true,
    timestamps: false
});