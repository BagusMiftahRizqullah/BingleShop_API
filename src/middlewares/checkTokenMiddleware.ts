import { Request, Response, NextFunction} from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
require('dotenv')
const {tb_logins} = require('../models')


class CheckToken {
    
    public static HeaderCheck = async (req: Request, res: Response, next: NextFunction ) =>{
        try{
            const {headers} = req
          
            let cekHeader =  headers.authorization?.split(" ")[1] || ""
           
  
        
            const decoded = jwt.verify(cekHeader, process.env.PRIVATE_KEY || "BEJ03" )
           


            if(!decoded){
                return res.status(403).json({
                    status_code:403,
                    message: 'No Auth token available'
                })
            } else {
                return next()
            }
          
        

        } catch(err: any){
           
            return res.status(403).json({
                status_code:403,
                message: err.message || 'No Auth token available'
            })
        }

    }   

    
}
module.exports = CheckToken