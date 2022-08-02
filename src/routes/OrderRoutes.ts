require('dotenv');
import { Router, Request, Response, } from "express";
import RouterI from "./RouterInterface";
//Controllers
import OrdersController from "../controllers/OrdersController";
const checkTokens= require('../middlewares/checkTokenMiddleware')

const validation = require('../middlewares/validationMiddleware')
const OrderSchema = require('../validations/orderSchema')


 class OrderRoutes implements RouterI {
    public router: Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    public routes(): void {
        this.router.get("/order",
        checkTokens.HeaderCheck,
        validation(OrderSchema),
        OrdersController.getOrder)
        
        this.router.get("/order/:id",
        checkTokens.HeaderCheck,
        validation(OrderSchema), 
        OrdersController.getOrderById)
        
        this.router.post("/order",
        checkTokens.HeaderCheck,
        validation(OrderSchema),
        OrdersController.postOrder)
        
        this.router.put("/order",
        checkTokens.HeaderCheck,
        validation(OrderSchema),
        OrdersController.updateOrder)
        
        this.router.delete("/order/:id",
        checkTokens.HeaderCheck,
        validation(OrderSchema),
         OrdersController.deleteOrder)

    }
 }

 export default new OrderRoutes().router;