'use strict';

module.exports = {
  async up (queryInterface, Sequelize){
    await queryInterface.createTable(
      'items',
      { 
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
      },
        created_at: {
          type: Sequelize.DATE,
          default: new Date()
        },
        updated_at: {
          type: Sequelize.DATE,
          default: new Date()
        },
        deleted_at: {
          type: Sequelize.DATE
        },
      },
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('items');
  }
};
