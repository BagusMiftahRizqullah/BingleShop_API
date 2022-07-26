import { Request, Response} from "express";
import CheckToken from "../utils/CheckToken"
const {tb_order_items} = require('../models')


class OrderItemsController {
   
    getOrderItems= async (req: Request, res: Response): Promise <Response> => {
        try {
             // cek Have Token ?
        await CheckToken.HeaderCheck(req, res)

        const OrderItems = await tb_order_items.findAll();

        console.log("OrderItems dsadsadsa",OrderItems)
        if(OrderItems == 0 ){
            return res.status(402).json({
                status_code:402,
                message: 'Data item tidak ada'
            })
        } else {

            let DataRes : Array<T> =[]

            const NewData : void = OrderItems?.map((v, i)=>{
                DataRes.push({
                    id: v.id,
                    id_user:v.id_user,
                    id_item: v.id_item,
                    item_name: v.item_name,
                    item_quantity: v.item_quantity,
                    item_price: v.item_price,
                })
            })
    
            if(!OrderItems){
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
        }
        
        } catch(err){
            return res.status(500).json({
                status_code:500,
                message: err || 'Server error',
                
            })
        }
       


    }
    
    getOrderItemsById= async (req: Request, res: Response): Promise <Response> => {
        try {
            const {params} = req
            // cek Have Token ?
            await CheckToken.HeaderCheck(req, res)
    
            const OrderItems = await tb_order_items.findOne({
                where: { id: params?.id}
            })
            
            
    
            if(!OrderItems){
                return res.status(402).json({
                    status_code:402,
                    message: 'Data Order Items tidak ada'
                })
            } else {
    
                if(OrderItems.length >1){
    
                    let DataRes : Array<T> =[]
    
                    const NewData : void = OrderItems?.map((v, i)=>{
                        DataRes.push({
                            id: v.id,
                            id_user: v.id_user,
                            id_item: v.id_item,
                            item_name: v.item_name,
                            item_quantity: v.item_quantity,
                            item_price: v.item_price,
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
                            id: OrderItems.id,
                            id_user: OrderItems.id_user,
                            id_item: OrderItems.id_item,
                            item_name: OrderItems.item_name,
                            item_quantity: OrderItems.item_quantity,
                            item_price: OrderItems.item_price,
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
    
    postOrderItems= async (req : Request, res: Response): Promise <Response> =>{
        try {
            let {
                id_item,
                id_user,
                item_name,
                item_quantity,
                item_price,
            } = req.body

                // cek Have Token ?
            await CheckToken.HeaderCheck(req, res)

            const createOrderItems = await  tb_order_items.create({
                id_item,
                id_user,
                item_name,
                item_quantity,
                item_price: parseInt(item_price) * parseInt(item_quantity),
            })

            if(!createOrderItems){
                return res.status(402).json({
                    status_code:402,
                    message: 'Data Order Items gagal ditambahkan'
                })
            }
           else{
            return res.status(200).json({
                status_code:200,
                message: 'Data Berhasil ditambahkan',
                data: createOrderItems
            })
           }

        }

        catch(err){
            return res.status(500).json({
                status_code:500,
                message: err ||  'Server error',
                
            })
        }
    }


    updateOrderItems= async (req: Request, res: Response): Promise <Response> => {
        try {

            const {id} = req.body

            // cek Have Token ?
            await CheckToken.HeaderCheck(req, res)
    
            const OrderItemsUpdate =  await tb_order_items.update(
                req.body,
                {
                    where: { id : id },
                });
                
            if (OrderItemsUpdate[0] == 0){
                return res.status(402).json({
                    status_code:402,
                    message: 'Data Order Items tidak ada'
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

    deleteOrderItems= async (req: Request, res: Response): Promise <Response> => {
        try {

            const {params} = req

            // cek Have Token ?
            await CheckToken.HeaderCheck(req, res)
    
            const OrderItemsDelete = await tb_order_items.destroy({
                where: {
                  id: params?.id
                }
              });
                
            if (!OrderItemsDelete){
                return res.status(402).json({
                    status_code:402,
                    message: 'Data Order Items tidak ada'
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


export default new OrderItemsController();