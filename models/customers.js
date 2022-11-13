const { Sequelize, DataTypes} = require('sequelize')
const bcrypt = require('bcrypt')

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
    })

    Customers.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password)
    }
    return Customers;
}
