module.exports =(sequelize, DataTypes) =>{
    const tb_users = sequelize.define('tb_users',{
        
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull:false,
            validate:{
                notEmpty: true
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull:false,
            
        },
        no_telephone: {
            type: DataTypes.STRING,
            allowNull:false,
           
        },
        alamat: {
            type: DataTypes.STRING,
            allowNull:false,
            
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull:false,
            unique: true,
            validate:{
                notEmpty: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull:false,
            unique: true,
            validate:{
                notEmpty: true
            }
        },
       
    }, );

    return tb_users
}