require('dotenv');
import { Router, Request, Response, } from "express";
import RouterI from "./RouterInterface";
//Controllers
import OrdersController from "../controllers/OrdersController";

 class OrderRoutes implements RouterI {
    public router: Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    public routes(): void {
        this.router.get("/order", OrdersController.getOrder)
        this.router.get("/order/:id", OrdersController.getOrderById)
        this.router.post("/order", OrdersController.postOrder)
        this.router.put("/order", OrdersController.updateOrder)
        this.router.delete("/order/:id", OrdersController.deleteOrder)

    }
 }

 export default new OrderRoutes().router;