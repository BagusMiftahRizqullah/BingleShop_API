const Sequelize = require('sequelize')
const sequelize = require('./sequelize')

class tb_promos extends Sequelize.Model {}

tb_promos.init({
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
}, {
    sequelize: sequelize,
    timestamps: true,
    underscored: true,
    paranoid: true,
    freezeTableName: true,
    tableName: 'tb_promos'
})

module.exports = tb_promos
