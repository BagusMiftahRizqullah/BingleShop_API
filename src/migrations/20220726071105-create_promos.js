'use strict';

module.exports = {
  async up (queryInterface, Sequelize){
    await queryInterface.createTable(
      'tb_promos',
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
       promo_name: {
          type: Sequelize.STRING,
          allowNull:false,
          
      },
      promo_category: {
          type: Sequelize.STRING,
          allowNull:false,
         
      },
      promo_code: {
          type: Sequelize.STRING,
          allowNull:false,
          
      },
      promo_amount: {
          type: Sequelize.INTEGER,
          allowNull:true,
         
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
    await queryInterface.dropTable('tb_promos');
  }
};
