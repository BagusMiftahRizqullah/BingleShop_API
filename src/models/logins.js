module.exports =(sequelize, DataTypes) =>{
    const tb_logins = sequelize.define('tb_logins',{
        
        id: {
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
            allowNull:false,
            validate:{
                notEmpty: true
            }
        },
       
    });

    return tb_logins
}