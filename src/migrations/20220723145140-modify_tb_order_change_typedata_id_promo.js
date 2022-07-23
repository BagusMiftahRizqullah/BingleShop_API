'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tb_order', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull:false,
        validate:{
            notEmpty: true
        }
    },

    id_customer: {
        type: Sequelize.INTEGER,
        allowNull:false,
        validate:{
            notEmpty: true
        }
    },

    id_order_items: {
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
            notEmpty: false
        }
    },

    id_promo: {
        type: Sequelize.INTEGER,
        allowNull:false,
        validate:{
            notEmpty: false
        }
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
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('tb_order');
  }
};
