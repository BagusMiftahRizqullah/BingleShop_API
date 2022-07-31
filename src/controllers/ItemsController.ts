import { Request, Response} from "express";
import CheckToken from "../utils/CheckToken"
const {items} = require('../models')


class ItemsController {
   
    getItems= async (req: Request, res: Response): Promise <Response> => {
        try {
      
        const item = await items.findAll();

        let DataRes : Array<T> =[]

        const NewData : void = item?.map((v, i)=>{
            DataRes.push({
                id: v.id,
                item_name: v.item_name,
                item_category: v.item_category,
                item_quantity: v.item_quantity,
                item_price: v.item_price,
                item_status: v.item_status
            })
        })

        if(!item){
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
         
    
            const item = await items.findOne({
                where: { id: params?.id}
            })
            
            
    
            if(!item){
                return res.status(402).json({
                    status_code:402,
                    message: 'Data item tidak ada'
                })
            } else {
    
                if(item.length >1){
    
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
                            id: item.id,
                            item_name: item.item_name,
                            item_category: item.item_category,
                            item_quantity: item.item_quantity,
                            item_price: item.item_price,
                            item_status: item.item_status
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

           

            const createItems = await  items.create({
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

         
    
            const itemUpdate =  await items.update(
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

    
            const itemDelete = await items.destroy({
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