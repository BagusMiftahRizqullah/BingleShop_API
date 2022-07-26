'use strict';

module.exports = {
  async up (queryInterface, Sequelize){
    await queryInterface.createTable(
      'tb_logins',
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
      id_users: {
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
      access_token: {
          type: Sequelize.TEXT,
          unique: true,
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
    await queryInterface.dropTable('tb_logins');
  }
};
