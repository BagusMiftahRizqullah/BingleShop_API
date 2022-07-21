import { Request, Response} from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
require('dotenv')
const tb_logins = require("../models").tb_logins


class CheckToken {
    
    public static HeaderCheck = async (req: Request, res: Response ) =>{
        const {headers} = req
       
        let cekHeader =  headers.authorization?.split(" ") || ""
        
        if(!cekHeader[1]){
            return res.status(403).json({
                status_code:403,
                message: 'No Auth token available'
            })
        } else {
            const tokens = await tb_logins.findOne({
                where: { access_token : cekHeader[1]}
            })

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