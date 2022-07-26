'use strict';

module.exports = {
  async up (queryInterface, Sequelize){
    await queryInterface.createTable(
      'tb_payments',
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
    await queryInterface.dropTable('tb_payments');
  }
};
