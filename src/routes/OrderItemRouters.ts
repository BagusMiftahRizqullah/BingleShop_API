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
        this.router.get("/orderitems", OrderItemsController.getItems)
        this.router.get("/orderitems/:id", OrderItemsController.getItemsById)
        this.router.post("/orderitems", OrderItemsController.postItems)
        this.router.put("/orderitems", OrderItemsController.updateItem)
        this.router.delete("/orderitems/:id", OrderItemsController.deleteItem)

    }
 }

 export default new OrderItemsRoutes().router;