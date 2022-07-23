require('dotenv');
import { Router, Request, Response, } from "express";
import RouterI from "./RouterInterface";
//Controllers
import OrderItemsController from "../controllers/OrderItemsController";

 class OrderItemsRoutes implements RouterI {
    public router: Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    public routes(): void {
        this.router.get("/orderitems", OrderItemsController.getOrderItems)
        this.router.get("/orderitems/:id", OrderItemsController.getOrderItemsById)
        this.router.post("/orderitems", OrderItemsController.postOrderItems)
        this.router.put("/orderitems", OrderItemsController.updateOrderItems)
        this.router.delete("/orderitems/:id", OrderItemsController.deleteOrderItems)

    }
 }

 export default new OrderItemsRoutes().router;