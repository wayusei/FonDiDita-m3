const { response } = require('express')
const jwt = require('jsonwebtoken')
const sequelize = require('../config/db')

const authenticateSeller = (req, res, next) => {
  const { authorization } = req.headers
  jwt.verify(authorization, 'secretKey', async (err, decoded) => {
    if(err) return res.status(401).json({ message: 'Unauthorized!' })
    req.seller = await sequelize.models.sellers.findOne({ where: { id: decoded.sellerId } })
    next()
  })
}

const authenticateCustomer = (req, res, next) => {
  const { authorization } = req.headers
  jwt.verify(authorization, 'secretKey', async (err, decoded) => {
    if(err) return res.status(401).json({ message: 'Unauthorized!' })
    req.customer = await sequelize.models.customers.findOne({ where: { id: decoded.customerId } })
    next()
  })
}

module.exports = {authenticateSeller, authenticateCustomer}