const { Sequelize, DataTypes} = require('sequelize');
const sequelize = require('../config/db');
const Orders_Details = require('./orders_details');
const Sellers = require('./sellers');


const Products = sequelize.define('products', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        allowNull: false
    },
    name:{
        type: DataTypes.STRING
    },
    price:{
        type: DataTypes.INTEGER
    },
    description:{
        type: DataTypes.STRING
    },
    image:{
        type: DataTypes.STRING
    },
    thumbnail:{
        type: DataTypes.STRING
    },
    category:{
        type: DataTypes.INTEGER
    },
    seller_id:{ 
        type: DataTypes.INTEGER
    }
},
{
    freezeTableName: true,
    timestamps:false
});

module.exports = Products;