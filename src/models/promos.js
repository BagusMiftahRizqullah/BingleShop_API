module.exports =(sequelize, DataTypes) =>{
    const tb_promos = sequelize.define('tb_promos',{
        
        id: {
            autoIncrement: true,
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
            
        },
        promo_category: {
            type: DataTypes.STRING,
            allowNull:false,
           
        },
        promo_code: {
            type: DataTypes.STRING,
            allowNull:false,
            
        },
        promo_amount: {
            type: DataTypes.INTEGER,
            allowNull:false,
           
        },
       
    });

    return tb_promos
}