const { Sequelize, DataTypes} = require('sequelize');

module.exports = (sequelize) => sequelize.define('order_status', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    status: Sequelize.INTEGER,
    description: Sequelize.STRING
},
{
    freezeTableName: true,
    timestamps:false
});