require('dotenv');
import { Router, Request, Response, } from "express";
import RouterI from "./RouterInterface";
//Controllers
import ItemsController from "../controllers/ItemsController";

 class ItemsRoutes implements RouterI {
    public router: Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    public routes(): void {
        this.router.get("/items", ItemsController.getItems)
        this.router.get("/items/:id", ItemsController.getItemsById)
        this.router.post("/items", ItemsController.postItems)
        this.router.put("/items", ItemsController.updateItem)
        this.router.delete("/items/:id", ItemsController.deleteItem)

    }
 }

 export default new ItemsRoutes().router;