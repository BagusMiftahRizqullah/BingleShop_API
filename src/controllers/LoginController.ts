import { Request, Response} from "express";
const tb_users = require("../models").tb_users
const tb_logins = require("../models").tb_logins
import Auth from "../utils/Auth"
import CheckToken from "../utils/CheckToken"



class LoginController {
   
    signin =  async (req: Request, res: Response): Promise <Response> =>{
        let {user_name, password } = req.body

        //Cek Tokens 
        // const cekBearer = await CheckToken.HeaderCheck(req, res)
       
        const user = await tb_users.findOne({
            where: { user_name}
        })
        // console.log("userssreq", req)
        
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
        
    }

    signup =  async (req: Request, res: Response): Promise <Response> =>{
   
        let {name, no_telephone, alamat, user_name, password } = req.body
    try{

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
        console.log("test 1");

            //Hassing PWS
            const HasingPWS: string = await Auth.hash(password)
           
            //Insert To Database tb_users
            const createUser = await  tb_users.create({
                name,
                no_telephone,
                alamat,
                user_name,
                password: HasingPWS,
            })
          

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
                data: createUser
            })
           }

    } catch{
        return res.status(500).json({
            status_code:500,
            message: 'Server Error'
        })
    }
    }


}


export default new LoginController();