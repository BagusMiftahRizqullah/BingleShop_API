require('dotenv');
import { Router, Request, Response, } from "express";
import RouterI from "./RouterInterface";
//Controllers
import PaymentController from "../controllers/PaymentsController";

const checkTokens= require('../middlewares/checkTokenMiddleware')
const validation = require('../middlewares/validationMiddleware')
const PaymentSchema = require('../validations/paymentSchema')

 class PaymentRoutes implements RouterI {
    public router: Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    public routes(): void {
        this.router.get("/payment",
        checkTokens.HeaderCheck,
        PaymentController.getPayment)

        this.router.get("/payment/:id",
        checkTokens.HeaderCheck,
        PaymentController.getPaymentById)
        
        this.router.post("/payment",
        checkTokens.HeaderCheck,
        validation(PaymentSchema),
        PaymentController.postPayment)
        
        this.router.put("/payment",
        checkTokens.HeaderCheck,
        PaymentController.updatePayment)
        
        this.router.delete("/payment/:id", 
        checkTokens.HeaderCheck,
        PaymentController.deletePayment)

    }
 }

 export default new PaymentRoutes().router;