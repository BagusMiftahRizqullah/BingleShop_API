'use strict';

module.exports = {
  async up (queryInterface, Sequelize){
    await queryInterface.createTable(
      'tb_order_items',
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
    await queryInterface.dropTable('tb_order_items');
  }
};
