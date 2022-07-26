'use strict';

module.exports = {
  async up (queryInterface, Sequelize){
    await queryInterface.createTable(
      'users',
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
      name: {
          type: Sequelize.STRING,
          allowNull:false,
          
      },
      no_telephone: {
          type: Sequelize.STRING,
          allowNull:false,
         
      },
      alamat: {
          type: Sequelize.STRING,
          allowNull:false,
          
      },
      user_name: {
          type: Sequelize.STRING,
          allowNull:false,
          unique: true,
          validate:{
              notEmpty: true
          }
      },
      password: {
          type: Sequelize.STRING,
          allowNull:false,
          unique: true,
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
    await queryInterface.dropTable('users');
  }
};
