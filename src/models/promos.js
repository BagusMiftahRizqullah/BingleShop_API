module.exports =(sequelize, DataTypes) =>{
    const tb_promos = sequelize.define('tb_promo',{
        
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull:false,
            validate:{
                notEmpty: true
            }
        },
         promo_name: {
            type: DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty: true
            }
        },
        promo_category: {
            type: DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty: true
            }
        },
        promo_code: {
            type: DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty: true
            }
        },
        promo_amount: {
            type: DataTypes.INTEGER,
            allowNull:false,
            validate:{
                notEmpty: true
            }
        },
       
    });

    return tb_promos
}