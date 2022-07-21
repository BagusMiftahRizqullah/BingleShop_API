module.exports =(sequelize, DataTypes) =>{
    const tb_orders = sequelize.define('tb_orders',{
        
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull:false,
            validate:{
                notEmpty: true
            }
        },

        id_customer: {
            type: DataTypes.INTEGER,
            allowNull:false,
            validate:{
                notEmpty: true
            }
        },

        id_order_items: {
            type: DataTypes.INTEGER,
            allowNull:false,
            validate:{
                notEmpty: true
            }
        },

        id_promo: {
            type: DataTypes.INTEGER,
            allowNull:false,
            validate:{
                notEmpty: true
            }
        },

        no_invoice: {
            type: DataTypes.INTEGER,
            allowNull:false,
            validate:{
                notEmpty: true
            }
        },

        customer_name: {
            type: DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty: true
            }
        },

        date_order: {
            type: DataTypes.DATE,
            allowNull:false,
            validate:{
                notEmpty: true
            }
        },

        total_price: {
            type: DataTypes.INTEGER,
            allowNull:false,
            validate:{
                notEmpty: true
            }
        },

        order_status: {
            type: DataTypes.BOOLEAN,
            allowNull:false,
            validate:{
                notEmpty: true
            }
        },
       
    });

    return tb_orders
}