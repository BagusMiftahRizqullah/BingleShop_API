const Sequelize = require('sequelize')
const sequelize = require('./sequelize')

class tb_order_items extends Sequelize.Model {}

tb_order_items.init({
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull:false,
        validate:{
            notEmpty: true
        }
    },
    id_user: {
        type: Sequelize.INTEGER,
        allowNull:false,
        validate:{
            notEmpty: true
        },
        references: {
          model: 'users',
          key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
      },
    id_item: {
        type: Sequelize.INTEGER,
        allowNull:false,
        validate:{
            notEmpty: true
        },
        references: {
          model: 'items',
          key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
     item_name: {
        type: Sequelize.STRING,
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
    item_price: {
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
    tableName: 'tb_order_items'
})

module.exports = tb_order_items
