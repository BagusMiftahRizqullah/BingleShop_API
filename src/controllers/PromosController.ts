import { Request, Response} from "express";
import CheckToken from "../utils/CheckToken"
const {tb_promos} = require("../models")


class PromosController {
   
    getPromo= async (req: Request, res: Response): Promise <Response> => {
        try {
             // cek Have Token ?
        await CheckToken.HeaderCheck(req, res)

        const Promos = await tb_promos.findAll();

        console.log("Promo dsadsadsa",Promos)
        if(Promos == 0 ){
            return res.status(402).json({
                status_code:402,
                message: 'Data Promo tidak ada'
            })
        } else {

            let DataRes : Array<T> =[]

            const NewData : void = Promos?.map((v, i)=>{
                DataRes.push({
                    id: v.id,
                    promo_name:v.promo_name,
                    promo_category: v.promo_category,
                    promo_code: v.promo_code,
                    promo_amount: v.promo_amount,
                })
            })
    
            if(!Promos){
                return res.status(402).json({
                    status_code:402,
                    message: 'Data Promo tidak ada'
                })
            } else {
                return res.status(200).json({
                    status_code:200,
                    message: 'Data Berhasil diambil',
                    data: DataRes
                })
            }
        }
        
        } catch{
            return res.status(500).json({
                status_code:500,
                message: 'Server error',
                
            })
        }
       


    }
    
    getPromoById= async (req: Request, res: Response): Promise <Response> => {
        try {
            const {params} = req
            // cek Have Token ?
            await CheckToken.HeaderCheck(req, res)
    
            const Promo = await tb_promos.findOne({
                where: { id: params?.id}
            })
            
            
    
            if(!Promo){
                return res.status(402).json({
                    status_code:402,
                    message: 'Data Promo tidak ada'
                })
            } else {
    
                if(Promo.length >1){
    
                    let DataRes : Array<T> =[]
    
                    const NewData : void = Promo?.map((v, i)=>{
                        DataRes.push({
                            id: v.id,
                            promo_name:v.promo_name,
                            promo_category: v.promo_category,
                            promo_code: v.promo_code,
                            promo_amount: v.promo_amount
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
                            id: Promo.id,
                            promo_name:Promo.promo_name,
                            promo_category: Promo.promo_category,
                            promo_code: Promo.promo_code,
                            promo_amount: Promo.promo_amount
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
    
    postPromo= async (req : Request, res: Response): Promise <Response> =>{
        try {
            let {
                promo_name,
                promo_category,
                promo_code,
                promo_amount,
            } = req.body

                // cek Have Token ?
            await CheckToken.HeaderCheck(req, res)

            const createPromo = await  tb_promos.create({
                promo_name,
                promo_category,
                promo_code,
                promo_amount,
            })

            if(!createPromo){
                return res.status(402).json({
                    status_code:402,
                    message: 'Data Promo gagal ditambahkan'
                })
            }
           else{
            return res.status(200).json({
                status_code:200,
                message: 'Data Berhasil ditambahkan',
                data: createPromo
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


    updatePromo= async (req: Request, res: Response): Promise <Response> => {
        try {

            const {id} = req.body

            // cek Have Token ?
            await CheckToken.HeaderCheck(req, res)
    
            const PromoUpdate =  await tb_promos.update(
                req.body,
                {
                    where: { id : id },
                });
                
            if (PromoUpdate[0] == 0){
                return res.status(402).json({
                    status_code:402,
                    message: 'Data Promo tidak ada'
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

    deletePromo= async (req: Request, res: Response): Promise <Response> => {
        try {

            const {params} = req

            // cek Have Token ?
            await CheckToken.HeaderCheck(req, res)
    
            const PromoDelete = await tb_promos.destroy({
                where: {
                  id: params?.id
                }
              });
                
            if (!PromoDelete){
                return res.status(402).json({
                    status_code:402,
                    message: 'Data Promo tidak ada'
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


export default new PromosController();