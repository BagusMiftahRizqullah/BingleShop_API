const Sequelize = require('sequelize')
const sequelize = require('./sequelize')

class items extends Sequelize.Model {}

items.init({
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull:false,
        validate:{
            notEmpty: true
        }
    },
     item_name: {
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
            notEmpty: true
        }
    },
    item_category: {
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
            notEmpty: true
        }
    },
    item_price: {
        type: Sequelize.INTEGER,
        allowNull:false,
        validate:{
            notEmpty: true
        }
    },
    item_quantity: {
        type: Sequelize.INTEGER,
        allowNull:false,
        validate:{
            notEmpty: true
        }
    },
    item_status: {
        type: Sequelize.BOOLEAN,
        allowNull:false,
        validate:{
            notEmpty: true
        }
    }
}, {
    sequelize: sequelize,
    timestamps: true,
    underscored: true,
    paranoid: true,
    freezeTableName: true,
    tableName: 'items'
})

module.exports = items
