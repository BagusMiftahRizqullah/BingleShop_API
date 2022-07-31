require('dotenv');
import { Router, Request, Response, } from "express";
import RouterI from "./RouterInterface";
//Controllers
import OrdersController from "../controllers/OrdersController";
const checkTokens= require('../middlewares/checkTokenMiddleware')


 class OrderRoutes implements RouterI {
    public router: Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    public routes(): void {
        this.router.get("/order",
        checkTokens.HeaderCheck,
        OrdersController.getOrder)
        
        this.router.get("/order/:id",
        checkTokens.HeaderCheck, 
        OrdersController.getOrderById)
        
        this.router.post("/order",
        checkTokens.HeaderCheck,
        OrdersController.postOrder)
        
        this.router.put("/order",
        checkTokens.HeaderCheck,
        OrdersController.updateOrder)
        
        this.router.delete("/order/:id",
        checkTokens.HeaderCheck,
         OrdersController.deleteOrder)

    }
 }

 export default new OrderRoutes().router;