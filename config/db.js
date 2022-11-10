const { Sequelize } = require('sequelize');

const Categories = require('../models/categories')
const Customers = require('../models/customers')
const OrderStatus = require('../models/order_status')
const Orders_Details = require('../models/orders_details')
const Orders = require('../models/orders')
const Products = require('../models/products')
const Sellers = require('../models/sellers')

const sequelize = new Sequelize(
  'railway',
  'root',
  's3GcRVgV3XzrO3clvuYW',
  {
    host: 'containers-us-west-55.railway.app',
    dialect: 'mysql',
    port: 7548,
    logging: false 
  }
)

const models = [ 
  Categories, 
  Customers, 
  OrderStatus, 
  Orders_Details,
  Orders,
  Products,
  Sellers
  ]

for(let model of models)
  model(sequelize)

//Relaciones

module.exports = sequelize;