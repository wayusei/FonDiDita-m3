const { Sequelize, DataTypes} = require('sequelize');
/* const sequelize = require('../config/db');

const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const secret = require('../config/secret'); */


module.exports = (sequelize) => {
    const Customers = sequelize.define('customers', {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        username: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.STRING,
        full_name: Sequelize.STRING,
        billing_address: Sequelize.STRING,
        default_shipping_address: Sequelize.STRING,
        phone: Sequelize.INTEGER
    }, {
        freezeTableName: true,
        timestamps:false,
        hooks: {
            beforeCreate: (user) => {
              const salt = bcrypt.genSaltSync()
              user.password = bcrypt.hashSync(user.password, salt)
            }
        }
    });

    Customers.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password)
    }
    
    return Customers;
}
/* 
Customers.createPassword = function(plainText) {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto
        .pbkdf2Sync(plainText, salt, 1000, 100, "sha512")
        .toString("hex");
    return {salt: salt, hash: hash}
}

Customers.validatePassword = function(password, user_salt, user_hash) {
    const hash = crypto
        .pbkdf2Sync(password, user_salt, 1000, 100, "sha512")
        .toString("hex");
    return user_hash === hash;
}



Customers.generateJWT = function(user) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60); 

    return jwt.sign({
        user: user.username,
        exp: parseInt(exp.getTime() / 1000)
    }, secret);
}
 */