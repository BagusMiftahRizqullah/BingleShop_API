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


        let compares = await Auth.ComparePws(password, user.password)
        if(compares){
            let newToken = Auth.generateToken(user.id, user.user_name, user.password)
            
             await  tb_logins.create({
                id_users: user.id,
                access_token: newToken
            })
            
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
            console.log("HasingPWS", HasingPWS);
            console.log("test 2");
            //Insert To Database tb_users
            const createUser = await  tb_users.create({
                name,
                no_telephone,
                alamat,
                user_name,
                password: HasingPWS,
            })
            console.log("test 3");
            console.log("createUser123", createUser);

            return res.send(createUser);

    } catch{
        return res.status(500).json({
            status_code:500,
            message: 'Server Error'
        })
    }
    }
    
    
    
    
    // index(req: Request, res: Response): Response {
        
    //     return res.send("ini adalah index");
    // }
    // show(req: Request, res: Response): Response {
    //     return res.send("ini adalah create")
    // }
    // update(req: Request, res: Response): Response {
    //     return res.send("ini adalah update")
    // }
    // delete(req: Request, res: Response): Response {
    //     return res.send("ini adalah delete")
    // }

}


export default new LoginController();