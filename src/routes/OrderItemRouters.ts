require('dotenv');
import { Router, Request, Response, } from "express";
import RouterI from "./RouterInterface";
//Controllers
import OrderItemsController from "../controllers/OrderItemsController";
const checkTokens= require('../middlewares/checkTokenMiddleware')

 class OrderItemsRoutes implements RouterI {
    public router: Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    public routes(): void {
        this.router.get("/orderitems",
        checkTokens.HeaderCheck,
         OrderItemsController.getOrderItems)
        this.router.get("/orderitems/:id",
        checkTokens.HeaderCheck,
         OrderItemsController.getOrderItemsById)
        this.router.post("/orderitems",
        checkTokens.HeaderCheck,
         OrderItemsController.postOrderItems)
        this.router.put("/orderitems",
        checkTokens.HeaderCheck,
         OrderItemsController.updateOrderItems)
        this.router.delete("/orderitems/:id",
        checkTokens.HeaderCheck,
         OrderItemsController.deleteOrderItems)

    }
 }

 export default new OrderItemsRoutes().router;