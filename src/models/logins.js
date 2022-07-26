

const Sequelize = require('sequelize')
const sequelize = require('./sequelize')

class tb_logins extends Sequelize.Model {}

tb_logins.init({
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
}, {
    sequelize: sequelize,
    timestamps: true,
    underscored: true,
    paranoid: true,
    freezeTableName: true,
    tableName: 'tb_logins'
})

module.exports = tb_logins