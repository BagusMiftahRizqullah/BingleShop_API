import { Request, Response} from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
require('dotenv')
const {tb_logins} = require('../models')


class CheckToken {
    
    public static HeaderCheck = async (req: Request, res: Response ) =>{
        const {headers} = req
       
        let cekHeader =  headers.authorization?.split(" ") || ""
        console.log("cekHeader", cekHeader)
        if(!cekHeader[1]){
            return res.status(403).json({
                status_code:403,
                message: 'No Auth token available'
            })
        } else {
            console.log("tokens1")
            const tokens = await tb_logins.findOne({
                where: { access_token : cekHeader[1]}
            })
            console.log("tokens2", tokens)
            if(!tokens){
                return res.status(403).json({
                    status_code:403,
                    message: 'No Auth token available'
                })
            } else {
               return true
            }
        }
    

    }   

}

export default CheckToken;