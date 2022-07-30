import { Request, Response, NextFunction} from "express";
import Auth from "../utils/Auth"
const {users, tb_logins, sequelize} = require('../models')


class LoginController {
   
    signin =  async (req: Request, res: Response): Promise <Response> =>{
                let {user_name, password } = req.body
            try {
                //Cek Tokens 
                // const cekBearer = await CheckToken.HeaderCheck(req, res)
                await sequelize.transaction(async (trx) => {
                    const user = await users.findOne({
                        where: { user_name}
                    },  {
                        transaction: trx
                    })
                    console.log("userssreq", user)
                    if(!user){
                        return res.status(402).json({
                            status_code:402,
                            message: 'Data users tidak ada'
                        })
                    } 
                        const DataRes = {
                            id: user.id,
                            name: user.name,
                            no_telephone: user.no_telephone
                        }
                
                        // Compare password in DB and user send
                        let compares = await Auth.ComparePws(password, user.password)
                        if(compares){
                            let newToken = Auth.generateToken(user.id, user.user_name, user.password)
                            
                            const cekUserLogin = await tb_logins.findOne({
                                where: { id_users : user.id }
                            },  {
                                transaction: trx
                            })
                
                            // if user have login
                            if(cekUserLogin){
                                await tb_logins.update(
                                    {
                                    access_token: newToken,
                                    },
                                    {
                                        where: { id_users : user.id },
                                    });
                            } else {
                
                                await  tb_logins.create({
                                id_users: user.id,
                                access_token: newToken
                            },  {
                                transaction: trx
                            })
                            }
                
                            
                            return res.send({
                                status_code: 200,
                                message: 'login successfully',
                                data: DataRes,
                                token: newToken,
                            })
                
                
                        } else {
                            return res.status(402).json({
                                status_code:402,
                                message: 'Username atau password anda salah'
                            })
                        }
            
            
                    
                })
            
            } 
            catch (error){
                console.log(error)
                return res.status(500).json({
                    status_code:500,
                    message: error || 'Server error',
                    
                })
            }  
    }

    signup =  async (req: Request, res: Response): Promise <Response> =>{
   
        let {name, no_telephone, alamat, user_name, password } = req.body
    try{


        await sequelize.transaction(async (trx) => {
            if(
                name == '' ||
                no_telephone == '' ||
                alamat == '' ||
                user_name == '' ||
                password == '' 
                ){
                    return res.status(402).json({
                        status_code:402,
                        message: 'Invalid request'
                    })
            }
    
    
            const cekUsername = await users.findOne({
                where: { user_name : user_name}
            })
    
            if(cekUsername){
                return res.status(402).json({
                    status_code:402,
                    message: 'Username already exist'
                })
            }
            
                //Hassing PWS
                const HasingPWS: string = await Auth.hash(password)
                console.log("test 2",HasingPWS);
                //Insert To Database tb_users
                const createUser = await  users.create({
                    name,
                    no_telephone,
                    alamat,
                    user_name,
                    password: HasingPWS,
                }, {
                    transaction: trx
                })
                console.log("test 3", createUser);
    
                if(!createUser){
                    return res.status(402).json({
                        status_code:402,
                        message: 'Data user gagal ditambahkan'
                    })
                }
               else{
                return res.status(200).json({
                    status_code:200,
                    message: 'Data Berhasil ditambahkan',
                    data:{
                        name : createUser.name,
                        no_telephone : createUser.no_telephone,
                        alamat: createUser.alamat,
                        user_name: createUser.user_name,
                    } 
                })
               }
        })

      

    } catch(err){
        return res.status(500).json({
            status_code:500,
            message: err || 'Server Error'
        })
    }
    }


}


export default new LoginController();