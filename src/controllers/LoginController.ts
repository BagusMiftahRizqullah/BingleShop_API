import { Request, Response} from "express";
const tb_users = require("../models").tb_users

// const jwt = require('jsonwebtoken');


class LoginController {
   

    signin =  async (req: Request, res: Response): Promise <Response> =>{
        // let {user_name, password } = req.body
        // console.log("responsess", user_name, password)
        console.log("reqSignin",JSON.stringify(req.body));
       
        return res.send("ini adalah create")
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
        console.log("createUser123", req.body);

            //Insert To Database tb_users
            const createUser = await  tb_users.create({
                name,
                no_telephone,
                alamat,
                user_name,
                password,
            })
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