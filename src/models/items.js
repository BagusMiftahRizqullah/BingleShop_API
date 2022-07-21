module.exports =(sequelize, DataTypes) =>{
    const tb_items = sequelize.define('tb_items',{
        
        id: {
            autoIncrement: true,
            primaryKey: true,
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
        item_category: {
            type: DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty: true
            }
        },
        item_price: {
            type: DataTypes.INTEGER,
            allowNull:false,
            validate:{
                notEmpty: true
            }
        },
        item_quantity: {
            type: DataTypes.INTEGER,
            allowNull:false,
            validate:{
                notEmpty: true
            }
        },
        item_status: {
            type: DataTypes.BOOLEAN,
            allowNull:false,
            validate:{
                notEmpty: true
            }
        },
    });

    return tb_items
}