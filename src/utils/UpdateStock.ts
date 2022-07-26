import { Request, Response} from "express";
require('dotenv')
const tb_logins = require("../models").tb_logins
const tb_orders = require("../models").tb_orders
const tb_order_items = require("../models").tb_order_items
const tb_items = require("../models").tb_items


class UpdateStock {
    
    public static Update = async (req: Request, res: Response ) =>{
        let {
            id_orders,
            payment_date,
            payment_type,
            amount
        } = req.body

        try{
            
            const dataOrder = await tb_orders.findOne({
                where: { id: id_orders}
            })
            console.log("dataOrder___FUNC", dataOrder)
    
            // let resOrderItems : Array<T> =[]
            const dataOrderItems = await tb_order_items.findAll({
                where: { id_user: dataOrder.id_customer}
            })
            const toString =  JSON.stringify(dataOrderItems)
            const toJSON =  JSON.parse(toString)
             // await resOrderItems.push(toJSON)
           
    
            console.log("dataOrderItems111___FUNC", toJSON)
     
                let id_itemss = await dataOrder?.id_order_items?.split(',')
                console.log("arryy___FUNC NEWSS INDEXXX", id_itemss )
                

              
                // let newDatas: Array<T> =[]
                await Promise.all(
                    await toJSON.map(async(v,i) => {
    
                        let resJSON =   await tb_items.findAll({
                             where: { id: parseInt(id_itemss[i])}
                         })
                             const toStringdataItems = await JSON.stringify(resJSON)
                             const toJSONdataItems = await JSON.parse(toStringdataItems)
                             // await newDatas.push(toJSONdataItems)
                         
                                
                                 console.log("toJSONdataItems10101", toJSONdataItems)
                                 // NewStock.push(parseInt(toJSONdataItems[i]?.item_quantity) == 0 ? 0 : parseInt(toJSONdataItems[i]?.item_quantity) - parseInt(v?.item_quantity))
                                  console.log("toJSONdataItems1111", toJSONdataItems[i]?.item_quantity)
                                  console.log("item_quantity1111", parseInt(v?.item_quantity))
                                  console.log( "newsstock111111",parseInt(toJSONdataItems[i]?.item_quantity) != null ?  parseInt(toJSONdataItems[i]?.item_quantity) - parseInt(v?.item_quantity) : 0 )
                                  console.log("INDEXXX1111", i)
                                 
     
                           
                           
     
                         //     const toStringdataItems = await JSON.stringify(dataItems)
                         //     const toJSONdataItems = await JSON.parse(toStringdataItems)
                         //     console.log("arryy___FUNC ITEMSS INDEXXX", i )
                         //     console.log("arryy___FUNC ITEMSS VALUESS", v )
                         //     console.log("arryy___FUNC ITEMSS", v?.item_quantity )
                         
                         //     console.log("id_itemss mnya Barus", parseInt(id_itemss[i]) )
                         //     console.log("id_itemss mnya toJSONdataItems", toJSONdataItems)
                          
         
                         //    await NewStock.push(parseInt(toJSONdataItems[i]?.item_quantity) == 0 ? 0 : parseInt(toJSONdataItems[i]?.item_quantity) - parseInt(v?.item_quantity))
               
                         
                         // let countNewStock = toJSONdataItems[i]?.item_quantity == 0 ? 0 : parseInt(toJSONdataItems[i]?.item_quantity) - parseInt(v?.item_quantity)
                         //    const StockUpdate =  await tb_items.update(
                         //        {
                         //            item_quantity: countNewStock
                         //        },
                         //        {
                         //            where: { id : parseInt(id_itemss[i])},
                         //        });
                              
                         //        console.log("StockUpdate", StockUpdate)
                         // if(newDatas.length == toJSON.length){
                         //     console.log("DataRes Arr123",newDatas)
     
                         //     newDatas[0]?.forEach(async(a,b) =>{
                         //         console.log("aaaaa", a?.item_quantity)
                         //         console.log("aaaaavvvvv", v?.item_quantity)
                         //         console.log( "newsstock111111 Benerssss",a?.item_quantity != null ? a.item_quantity - v?.item_quantity : 0 )
                         //     })
     
                         // }
                 });
                )
         
            
       
          
            // resOrderItems.forEach(v => {
            //     console.log("vvvv______Func", v.tb_order_items.dataValues.id)
            // });
    
            // let id_itemss = await dataOrder?.id_order_items?.split(',')
            // console.log("arryy___FUNC", id_itemss )
        } catch {
            return res.status(500).json({
                status_code:500,
                message: 'Server error',
                
            })
        }
    }   

}

export default UpdateStock;