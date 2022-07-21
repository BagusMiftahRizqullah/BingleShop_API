module.exports =(sequelize, DataTypes) =>{
    const tb_logins = sequelize.define('tb_logins',{
        
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull:false,
            validate:{
                notEmpty: true
            }
        },
        id_users: {
            type: DataTypes.INTEGER,
            allowNull:false,
            validate:{
                notEmpty: true
            }
        },
         access_token: {
            type: DataTypes.STRING,
            unique: true,
            allowNull:false,
            validate:{
                notEmpty: true
            }
        },
       
    });

    return tb_logins
}