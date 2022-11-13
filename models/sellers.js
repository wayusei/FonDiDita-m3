const { Sequelize, DataTypes} = require('sequelize')
const bcrypt = require('bcrypt')

module.exports = (sequelize) => {
    const Sellers = sequelize.define('sellers', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement: true
        },
        username: Sequelize.STRING,
        email:Sequelize.STRING,
        password: Sequelize.STRING,
        full_name: Sequelize.STRING,
        account: Sequelize.STRING,
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

    Sellers.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password)
    }
    return Sellers
}