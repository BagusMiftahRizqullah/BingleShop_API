module.exports =(sequelize, DataTypes) =>{
    const tb_payments = sequelize.define('tb_payment',{
        
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull:false,
            validate:{
                notEmpty: true
            }
        },
         
        id_orders: {
            type: DataTypes.INTEGER,
            allowNull:false,
            validate:{
                notEmpty: true
            }
        },
        payment_date: {
            type: DataTypes.DATE,
            allowNull:false,
            validate:{
                notEmpty: true
            }
        },
        payment_type: {
            type: DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty: true
            }
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull:false,
            validate:{
                notEmpty: true
            }
        },
       
    });

    return tb_payments
}