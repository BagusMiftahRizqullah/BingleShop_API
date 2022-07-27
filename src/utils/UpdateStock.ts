import { Request, Response} from "express";
require('dotenv')

const { orders, tb_order_items, items} = require('../models')

class UpdateStock {
    
    public static Update = async (req: Request, res: Response ) =>{
        let {
            id_orders,
            payment_date,
            payment_type,
            amount
        } = req.body

        try{
            console.log("startss", orders)
            //   await Promise.all()
            const dataOrder = await orders.findOne({
                where: { id: id_orders}
            })
            console.log("dataOrder___FUNC", dataOrder)
    
           
            const dataOrderItems = await tb_order_items.findAll({
                where: { id_user: dataOrder.id_user}
            })
            const toString =   JSON.stringify(dataOrderItems)
            const toJSON =  JSON.parse(toString)
           
           
    
            console.log("dataOrderItems111___FUNC", toJSON)
     
            toJSON.map(async(v,i)=>{
                let resJSON =   await items.findAll({
                                 where: { id: parseInt(v.id_item)}
                             })
                let toStringdataItems = await JSON.stringify(resJSON)
                let toJSONdataItems = await JSON.parse(toStringdataItems)

                console.log("toJSONdataItems22222",toJSONdataItems)

                await toJSONdataItems?.map(async(a,b)=>{
                    let countNewStock = await a.item_quantity == 0 ? 0 : parseInt(a?.item_quantity) - parseInt(v?.item_quantity)
                               const StockUpdate =  await items.update(
                                   {
                                       item_quantity: countNewStock
                                   },
                                   {
                                       where: { id : a.id},
                                   });
                                 
                                   console.log("StockUpdate", StockUpdate)
                                   
                })

                return true
                                     
            })
              
            
        
        } catch {
            return res.status(500).json({
                status_code:500,
                message: 'Server error',
                
            })
        }
    }   

}

export default UpdateStock;