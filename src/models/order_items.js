module.exports =(sequelize, DataTypes) =>{
    const tb_order_items = sequelize.define('tb_order_items',{
        
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull:false,
            validate:{
                notEmpty: true
            }
        },
        id_item: {
            type: DataTypes.INTEGER,
            allowNull:false,
            validate:{
                notEmpty: true
            }
        },
         item_name: {
            type: DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty: true
            }
        },
        alamat: {
            type: DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty: true
            }
        },
        order_quantity: {
            type: DataTypes.INTEGER,
            allowNull:false,
            validate:{
                notEmpty: true
            }
        },
       
    });

    return tb_order_items
}