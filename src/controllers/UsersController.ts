import { Request, Response} from "express";
// const tb_users = require("../models").tb_users
// const tb_logins = require("../models").tb_logins
import CheckToken from "../utils/CheckToken"
const {users, tb_logins} = require('../models')


class UsersController {
   
    getUser= async (req: Request, res: Response): Promise <Response> => {
        try {
        //      // cek Have Token ?
        // await CheckToken.HeaderCheck(req, res)

        const user = await users.findAll();

        let DataRes : Array<T> =[]

        const NewData : void = user?.map((v, i)=>{
            DataRes.push({
                id: v.id,
                name: v.name,
                no_telephone: v.no_telephone,
                alamat: v.alamat
            })
        })

        if(!user){
            return res.status(402).json({
                status_code:402,
                message: 'Data users tidak ada'
            })
        } else {
            return res.status(200).json({
                status_code:200,
                message: 'Data Berhasil diambil',
                data: DataRes
            })
        }
        } catch{
            return res.status(500).json({
                status_code:500,
                message: 'Server error',
                
            })
        }
       


    }
    
    getUserById= async (req: Request, res: Response): Promise <Response> => {
        try {
            const {params} = req
            // // cek Have Token ?
            // await CheckToken.HeaderCheck(req, res)
    
            const user = await users.findOne({
                where: { id: params?.id}
            })
            // const HasingPWS: string = await Auth.hash(password)
            
            
    
            if(!user){
                return res.status(402).json({
                    status_code:402,
                    message: 'Data users tidak ada'
                })
            } else {
    
                if(user.length >1){
    
                    let DataRes : Array<T> =[]
    
                    const NewData : void = user?.map((v, i)=>{
                        DataRes.push({
                            id: v.id,
                            name: v.name,
                            no_telephone: v.no_telephone,
                            alamat: v.alamat
                        })
                    })
                    return res.status(200).json({
                        status_code:200,
                        message: 'Data Berhasil diambil',
                        data: DataRes
                    })
        
            } else {
                return res.status(200).json({
                    status_code:200,
                    message: 'Data Berhasil diambil',
                    data: [{
                        id: user.id,
                        name: user.name,
                        no_telephone: user.no_telephone,
                        alamat: user.alamat
                    }]
                })
    
            }
               
            }
        } 

        catch{
            return res.status(500).json({
                status_code:500,
                message: 'Server error',
                
            })
        }
       


    }
    
    updateUser= async (req: Request, res: Response): Promise <Response> => {
        try {

            const {id} = req.body

            // // cek Have Token ?
            // await CheckToken.HeaderCheck(req, res)
    
            const userUpdate =  await users.update(
                req.body,
                {
                    where: { id : id },
                });
                
            if (userUpdate[0] == 0){
                return res.status(402).json({
                    status_code:402,
                    message: 'Data users tidak ada'
                })
            } else {
    
                return res.status(200).json({
                    status_code:200,
                    message: 'Data Berhasil di Update',
                })
               
            }
        } 

        catch{
            return res.status(500).json({
                status_code:500,
                message: 'Server error',
                
            })
        }
    }

    deleteUser= async (req: Request, res: Response): Promise <Response> => {
        try {

            const {params} = req

            // // cek Have Token ?
            // await CheckToken.HeaderCheck(req, res)
    
            const userDelete = await users.destroy({
                where: {
                  id: params?.id
                }
              });
                
            if (!userDelete){
                return res.status(402).json({
                    status_code:402,
                    message: 'Data users tidak ada'
                })
            } else {
    
                return res.status(200).json({
                    status_code:200,
                    message: 'Data Berhasil di Hapus',
                })
               
            }
        } 

        catch{
            return res.status(500).json({
                status_code:500,
                message: 'Server error',
                
            })
        }
    }
   

}


export default new UsersController();