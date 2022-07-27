import { Request, Response} from "express";
import CheckToken from "../utils/CheckToken"
import UpdateStock from "../utils/UpdateStock"
const {tb_payments, orders} = require('../models')


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

          

            const dataOrder = await orders.findOne({
                where: { id: id_orders}
            })
            console.log("dataOrder", dataOrder)

        

            const calculate = parseInt(amount) - parseInt(dataOrder.total_price)
            console.log("calculatess", calculate)

               

                
            if(calculate < 0){
                return res.status(402).json({
                    status_code:402,
                    message: 'Transaksi Gagal, Jumlah yang anda masukan kurang dari total price'
                })
            } else if(calculate > 0){
                 // // update stock
                await UpdateStock.Update(req, res)
                console.log("selesai update items")
    

                const OrderUpdate =  await orders.update(
                    {
                        order_status: true
                    },
                    {
                        where: { id : id_orders },
                    });

              
                    if(!OrderUpdate || OrderUpdate == 0){
                        return res.status(402).json({
                            status_code:402,
                            message: 'Transaksi Gagal'
                        })
                    }
                   else{
                    const createPayment = await  tb_payments.create({
                        id_orders,
                        payment_date,
                        payment_type,
                        amount
                    })

                    return res.status(200).json({
                        status_code:200,
                        message: 'Pembayaran Berhasil dibuat, sisa dari pembayaran tidak akan dikembalikan',
                        data: createPayment
                    })
                   }
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