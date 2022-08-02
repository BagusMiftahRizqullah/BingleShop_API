require('dotenv');
import { Router, Request, Response, } from "express";
import RouterI from "./RouterInterface";
//Controllers
import ItemsController from "../controllers/ItemsController";
const checkTokens= require('../middlewares/checkTokenMiddleware')

const validation = require('../middlewares/validationMiddleware')
const ItemsSchema = require('../validations/itemsSchema')


 class ItemsRoutes implements RouterI {
    public router: Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    public routes(): void {
        this.router.get("/items",
        checkTokens.HeaderCheck, 
        ItemsController.getItems)
        
        this.router.get("/items/:id",
        checkTokens.HeaderCheck,
         ItemsController.getItemsById)
        
        this.router.post("/items", 
        checkTokens.HeaderCheck,
        validation(ItemsSchema), 
        ItemsController.postItems)
        
        this.router.put("/items", 
        checkTokens.HeaderCheck,
        ItemsController.updateItem)
        
        this.router.delete("/items/:id",
        checkTokens.HeaderCheck, 
        ItemsController.deleteItem)

    }
 }

 export default new ItemsRoutes().router;