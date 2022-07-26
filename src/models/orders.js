const Sequelize = require('sequelize')
const sequelize = require('./sequelize')

class orders extends Sequelize.Model {}

orders.init({
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

    id_promo: {
        type: Sequelize.INTEGER,
        // allowNull:true,
        // validate:{
        //     notEmpty: false
        // },
    //     references: {
    //       model: 'tb_promos',
    //       key: 'id'
    //   },
    //   onUpdate: 'CASCADE',
    //   onDelete: 'CASCADE'
    },

    no_invoice: {
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
            notEmpty: true
        }
    },

    customer_name: {
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
            notEmpty: true
        }
    },

    date_order: {
        type: Sequelize.DATE,
        allowNull:false,
        validate:{
            notEmpty: true
        }
    },

    total_price: {
        type: Sequelize.INTEGER,
        allowNull:false,
        validate:{
            notEmpty: true
        }
    },

    order_status: {
        type: Sequelize.BOOLEAN,
        allowNull:false,
        validate:{
            notEmpty: false
        }
    },
}, {
    sequelize: sequelize,
    timestamps: true,
    underscored: true,
    paranoid: true,
    freezeTableName: true,
    tableName: 'orders'
})

module.exports = orders
