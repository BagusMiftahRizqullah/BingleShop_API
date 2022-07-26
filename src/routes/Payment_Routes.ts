require('dotenv');
import { Router, Request, Response, } from "express";
import RouterI from "./RouterInterface";
//Controllers
import PaymentController from "../controllers/PaymentsController";

 class PaymentRoutes implements RouterI {
    public router: Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    public routes(): void {
        this.router.get("/payment", PaymentController.getPayment)
        this.router.get("/payment/:id", PaymentController.getPaymentById)
        this.router.post("/payment", PaymentController.postPayment)
        this.router.put("/payment", PaymentController.updatePayment)
        this.router.delete("/payment/:id", PaymentController.deletePayment)

    }
 }

 export default new PaymentRoutes().router;