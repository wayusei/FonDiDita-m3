const { Sequelize, DataTypes} = require('sequelize');


module.exports = (sequelize) => sequelize.define('categories', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: Sequelize.STRING,
    description: Sequelize.STRING
},
{
    freezeTableName: true,
    timestamps:false
});