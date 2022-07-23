import { Request, Response} from "express";
const tb_orders = require("../models").tb_orders
const tb_order_items = require("../models").tb_order_items
import CheckToken from "../utils/CheckToken"



class OrderController {
   
    getOrder= async (req: Request, res: Response): Promise <Response> => {
        try {
             // cek Have Token ?
        await CheckToken.HeaderCheck(req, res)

        const Order = await tb_orders.findAll();

        
        if(Order == 0 ){
            return res.status(402).json({
                status_code:402,
                message: 'Data order tidak ada'
            })
        } else {

            let DataRes : Array<T> =[]

            const NewData : void = tb_orders?.map((v, i)=>{
                DataRes.push({
                    id: v.id,
                    id_customer: v.id_customer,
                    id_order_items: v.id_order_items,
                    id_promo: v.id_promo,
                    no_invoice: v.no_invoice,
                    customer_name: v.customer_name,
                    date_order:v.date_order,
                    total_price: v.total_price,
                    order_status: v.order_status
                })
            })
    
            if(!Order){
                return res.status(402).json({
                    status_code:402,
                    message: 'Data order tidak ada'
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
    
    getOrderById= async (req: Request, res: Response): Promise <Response> => {
        try {
            const {params} = req
            // cek Have Token ?
            await CheckToken.HeaderCheck(req, res)
    
            const Order = await tb_orders.findOne({
                where: { id: params?.id}
            })
            
            
    
            if(!Order){
                return res.status(402).json({
                    status_code:402,
                    message: 'Data Order tidak ada'
                })
            } else {
    
                if(Order.length >1){
    
                    let DataRes : Array<T> =[]
    
                    const NewData : void = Order?.map((v, i)=>{
                        DataRes.push({
                            id: v.id,
                            id_customer: v.id_customer,
                            id_order_items: v.id_order_items,
                            id_promo: v.id_promo,
                            no_invoice: v.no_invoice,
                            customer_name: v.customer_name,
                            date_order:v.date_order,
                            total_price: v.total_price,
                            order_status: v.order_status
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
                        id: Order.id,
                        id_customer: Order.id_customer,
                        id_order_items: Order.id_order_items,
                        id_promo: Order.id_promo,
                        no_invoice: Order.no_invoice,
                        customer_name: Order.customer_name,
                        date_order: Order.date_order,
                        total_price: Order.total_price,
                        order_status: Order.order_status
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


    
    postOrder= async (req : Request, res: Response): Promise <Response> =>{
        try {
            let {
                id_customer,
                id_order_items,
                id_promo,
                date_order,
                customer_name
            } = req.body

                // cek Have Token ?
            await CheckToken.HeaderCheck(req, res)

            const no_invoice : string =`INV-${Math.floor(Math.random() * 99999)}${id_customer}${id_order_items}`

            const OrderItems = await tb_order_items.findAll({
                where: { id_user: id_customer}
            })

            const toString : string = await JSON.stringify(OrderItems)
            const toJSON = await JSON.parse(toString);
            // await console.log("OrderItems123321", toJSON)

            const total_price : void = await
            toJSON.reduce((a,b)=> a.item_price + b.item_price);

            const id_order_itemsToString : void = await id_order_items.toString()
            const Bodys =
               {
                    id_customer: id_customer,
                    id_order_items: id_order_itemsToString,
                    id_promo: id_promo == null ? 0 : 0,
                    no_invoice: no_invoice.includes(",")? no_invoice.replace(',',''): no_invoice,
                    customer_name: customer_name,
                    date_order: date_order,
                    total_price: total_price,
                    order_status: false
            }

            console.log("BODYSS",Bodys)
            console.log("Goo createOrders")
           
                const createOrder = await  tb_orders.create(Bodys)
    
                console.log("createOrders",createOrder )
                if(!createOrder){
                    return res.status(402).json({
                        status_code:402,
                        message: 'Data Order gagal ditambahkan'
                    })
                }
               else{
                return res.status(200).json({
                    status_code:200,
                    message: 'Data Berhasil ditambahkan',
                    data: createOrder
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


    updateOrder= async (req: Request, res: Response): Promise <Response> => {
        try {

            const {id} = req.body

            // cek Have Token ?
            await CheckToken.HeaderCheck(req, res)
    
            const OrderUpdate =  await tb_orders.update(
                req.body,
                {
                    where: { id : id },
                });
                
            if (OrderUpdate[0] == 0){
                return res.status(402).json({
                    status_code:402,
                    message: 'Data Order tidak ada'
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

    deleteOrder= async (req: Request, res: Response): Promise <Response> => {
        try {

            const {params} = req

            // cek Have Token ?
            await CheckToken.HeaderCheck(req, res)
    
            const OrderDelete = await tb_orders.destroy({
                where: {
                  id: params?.id
                }
              });
                
            if (!OrderDelete){
                return res.status(402).json({
                    status_code:402,
                    message: 'Data Order tidak ada'
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


export default new OrderController();