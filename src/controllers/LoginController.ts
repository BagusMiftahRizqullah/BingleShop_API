import { Request, Response} from "express";

const jwt = require('jsonwebtoken');


class LoginController {
    index(req: Request, res: Response): Response {
        
        return res.send("ini adalah index");
    }

    signin =  async (req: Request, res: Response): Promise <Response> =>{
        // let {user_name, password } = req.body
        // console.log("responsess", user_name, password)
        console.log("reqSigni",JSON.stringify(req.body));
       
        return res.send("ini adalah create")
    }

    signup =  async (req: Request, res: Response): Promise <Response> =>{
        // let {user_name, password } = req.body
        // console.log("responsess", user_name, password)
        console.log("reqSigni",JSON.stringify(req.body));
       
        return res.send("ini adalah create")
    }

    show(req: Request, res: Response): Response {
        return res.send("ini adalah create")
    }
    update(req: Request, res: Response): Response {
        return res.send("ini adalah update")
    }
    delete(req: Request, res: Response): Response {
        return res.send("ini adalah delete")
    }

}


export default new LoginController();