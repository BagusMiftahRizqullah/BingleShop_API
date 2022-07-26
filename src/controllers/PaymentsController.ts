import { Request, Response} from "express";
const tb_payments = require("../models").tb_payments
const tb_orders = require("../models").tb_orders
const tb_order_items = require("../models").tb_order_items
const tb_items = require("../models").tb_items
import CheckToken from "../utils/CheckToken"
import UpdateStock from "../utils/UpdateStock"


class PaymentController {
   
    getPayment= async (req: Request, res: Response): Promise <Response> => {
        try {
             // cek Have Token ?
        await CheckToken.HeaderCheck(req, res)

        const Payments = await tb_payments.findAll();

     
        if(Payments == 0 ){
            return res.status(402).json({
                status_code:402,
                message: 'Data Payment tidak ada'
            })
        } else {

            let DataRes : Array<T> =[]

            const NewData : void = Payments?.map((v, i)=>{
                DataRes.push({
                    id: v.id,
                    id_orders: v.id_orders,
                    payment_date: v.payment_date,
                    payment_type: v.payment_type,
                    amount: v.amount
                })
            })
    
            if(!Payments){
                return res.status(402).json({
                    status_code:402,
                    message: 'Data Payment tidak ada'
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
    
    getPaymentById= async (req: Request, res: Response): Promise <Response> => {
        try {
            const {params} = req
            // cek Have Token ?
            await CheckToken.HeaderCheck(req, res)
    
            const Payment = await tb_payments.findOne({
                where: { id: params?.id}
            })
            
            
    
            if(!Payment){
                return res.status(402).json({
                    status_code:402,
                    message: 'Data Payment tidak ada'
                })
            } else {
    
                if(Payment.length >1){
    
                    let DataRes : Array<T> =[]
    
                    const NewData : void = Payment?.map((v, i)=>{
                        DataRes.push({
                            id: v.id,
                            id_orders: v.id_orders,
                            payment_date: v.payment_date,
                            payment_type: v.payment_type,
                            amount: v.amount
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
                        id: Payment.id,
                        id_orders: Payment.id_orders,
                        payment_date: Payment.payment_date,
                        payment_type: Payment.payment_type,
                        amount: Payment.amount
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
    
    postPayment= async (req : Request, res: Response): Promise <Response> =>{
        try {
            let {
                id_orders,
                payment_date,
                payment_type,
                amount
            } = req.body

                // cek Have Token ?
            await CheckToken.HeaderCheck(req, res)

          

            const dataOrder = await tb_orders.findOne({
                where: { id: id_orders}
            })
            console.log("dataOrder", dataOrder)

        

            const calculate = parseInt(amount) - parseInt(dataOrder.total_price)
            console.log("calculatess", calculate)

                // update stock
                await UpdateStock.Update(req, res)

                
            if(calculate < 0){
                return res.status(402).json({
                    status_code:402,
                    message: 'Transaksi Gagal, Jumlah yang anda masukan kurang dari total price'
                })
            } else if(calculate > 0){
                // console.log("masuk calculates", dataOrder)
                // let id_itemss = await dataOrder?.id_order_items?.split(',')
                // console.log("arryy", id_itemss )
          
                // const newStock = await dataOrderItems?.item_quantity



                // const OrderUpdate =  await tb_orders.update(
                //     {
                //         order_status: true
                //     },
                //     {
                //         where: { id : id_orders },
                //     });

                // const StockUpdate =  await tb_items.update(
                //     {
                //         item_quantity: id_itemss
                //     },
                //     {
                //         where: { id : id_itemss },
                //     });
                //     console.log("StockUpdate", StockUpdate)
                //     if(!OrderUpdate){
                //         return res.status(402).json({
                //             status_code:402,
                //             message: 'Transaksi Gagal'
                //         })
                //     }
                //    else{
                //     const createPayment = await  tb_payments.create({
                //         id_orders,
                //         payment_date,
                //         payment_type,
                //         amount
                //     })

                //     return res.status(200).json({
                //         status_code:200,
                //         message: 'Pembayaran Berhasil dibuat, sisa dari pembayaran tidak akan dikembalikan',
                //         data: createPayment
                //     })
                //    }
                return res.status(500).json({
                    status_code:500,
                    message: 'Server error',
                    
                })
            } else {
                return res.status(500).json({
                    status_code:500,
                    message: 'Server error',
                    
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


    updatePayment= async (req: Request, res: Response): Promise <Response> => {
        try {

            const {id} = req.body

            // cek Have Token ?
            await CheckToken.HeaderCheck(req, res)
    
            const PaymentUpdate =  await tb_payments.update(
                req.body,
                {
                    where: { id : id },
                });
                
            if (PaymentUpdate[0] == 0){
                return res.status(402).json({
                    status_code:402,
                    message: 'Data Payment tidak ada'
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

    deletePayment= async (req: Request, res: Response): Promise <Response> => {
        try {

            const {params} = req

            // cek Have Token ?
            await CheckToken.HeaderCheck(req, res)
    
            const PaymentDelete = await tb_payments.destroy({
                where: {
                  id: params?.id
                }
              });
                
            if (!PaymentDelete){
                return res.status(402).json({
                    status_code:402,
                    message: 'Data Payment tidak ada'
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


export default new PaymentController();