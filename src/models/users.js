const Sequelize = require('sequelize')
const sequelize = require('./sequelize')

class users extends Sequelize.Model {}

users.init({
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
}, {
    sequelize: sequelize,
    timestamps: true,
    underscored: true,
    paranoid: true,
    freezeTableName: true,
    tableName: 'users'
})

module.exports = users
