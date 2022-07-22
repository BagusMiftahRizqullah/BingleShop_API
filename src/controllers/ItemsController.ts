import { Request, Response} from "express";
const tb_items = require("../models").tb_items
import CheckToken from "../utils/CheckToken"



class ItemsController {
   
    getItems= async (req: Request, res: Response): Promise <Response> => {
        try {
             // cek Have Token ?
        await CheckToken.HeaderCheck(req, res)

        const items = await tb_items.findAll();

        let DataRes : Array<T> =[]

        const NewData : void = items?.map((v, i)=>{
            DataRes.push({
                id: v.id,
                item_name: v.item_name,
                item_category: v.item_category,
                item_quantity: v.item_quantity,
                item_price: v.item_price,
                item_status: v.item_status
            })
        })

        if(!items){
            return res.status(402).json({
                status_code:402,
                message: 'Data item tidak ada'
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
    
    getItemsById= async (req: Request, res: Response): Promise <Response> => {
        try {
            const {params} = req
            // cek Have Token ?
            await CheckToken.HeaderCheck(req, res)
    
            const items = await tb_items.findOne({
                where: { id: params?.id}
            })
            
            
    
            if(!items){
                return res.status(402).json({
                    status_code:402,
                    message: 'Data item tidak ada'
                })
            } else {
    
                if(items.length >1){
    
                    let DataRes : Array<T> =[]
    
                    const NewData : void = items?.map((v, i)=>{
                        DataRes.push({
                            id: v.id,
                            item_name: v.item_name,
                            item_category: v.item_category,
                            item_quantity: v.item_quantity,
                            item_price: v.item_price,
                            item_status: v.item_status
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
                            id: items.id,
                            item_name: items.item_name,
                            item_category: items.item_category,
                            item_quantity: items.item_quantity,
                            item_price: items.item_price,
                            item_status: items.item_status
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
    
    postItems= async (req : Request, res: Response): Promise <Response> =>{
        try {
            let {
                item_name, 
                item_category, 
                item_quantity, 
                item_price,
                item_status
            } = req.body

                // cek Have Token ?
            await CheckToken.HeaderCheck(req, res)

            const createItems = await  tb_items.create({
                item_name, 
                item_category, 
                item_quantity, 
                item_price,
                item_status
            })

            if(!createItems){
                return res.status(402).json({
                    status_code:402,
                    message: 'Data item gagal ditambahkan'
                })
            }
           else{
            return res.status(200).json({
                status_code:200,
                message: 'Data Berhasil ditambahkan',
                data: createItems
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


    updateItem= async (req: Request, res: Response): Promise <Response> => {
        try {

            const {id} = req.body

            // cek Have Token ?
            await CheckToken.HeaderCheck(req, res)
    
            const itemUpdate =  await tb_items.update(
                req.body,
                {
                    where: { id : id },
                });
                console.log("itemUpdate", itemUpdate)
            if (itemUpdate[0] == 0){
                return res.status(402).json({
                    status_code:402,
                    message: 'Data item tidak ada'
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

    deleteItem= async (req: Request, res: Response): Promise <Response> => {
        try {

            const {params} = req

            // cek Have Token ?
            await CheckToken.HeaderCheck(req, res)
    
            const itemDelete = await tb_items.destroy({
                where: {
                  id: params?.id
                }
              });
                
            if (!itemDelete){
                return res.status(402).json({
                    status_code:402,
                    message: 'Data item tidak ada'
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


export default new ItemsController();