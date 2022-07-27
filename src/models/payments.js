const Sequelize = require('sequelize')
const sequelize = require('./sequelize')

class tb_payments extends Sequelize.Model {}

tb_payments.init({
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull:false,
        validate:{
            notEmpty: true
        }
    },
     
    id_orders: {
        type: Sequelize.INTEGER,
        allowNull:false,
        validate:{
            notEmpty: true
        },
        references: {
          model: 'orders',
          key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    payment_date: {
        type: Sequelize.DATE,
        allowNull:false,
        validate:{
            notEmpty: true
        }
    },
    payment_type: {
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
            notEmpty: true
        }
    },
    amount: {
        type: Sequelize.INTEGER,
        allowNull:false,
        validate:{
            notEmpty: true
        }
    },
}, {
    sequelize: sequelize,
    timestamps: true,
    underscored: true,
    paranoid: true,
    freezeTableName: true,
    tableName: 'tb_payments'
})

module.exports = tb_payments