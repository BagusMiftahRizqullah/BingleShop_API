require('dotenv');
import { Router, Request, Response, } from "express";
import RouterI from "./RouterInterface";
//Controllers
import PromosController from "../controllers/PromosController";
const checkTokens= require('../middlewares/checkTokenMiddleware')
 class PromoRoutes implements RouterI {
    public router: Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    public routes(): void {
        this.router.get("/promo",
        checkTokens.HeaderCheck,
        PromosController.getPromo)
        
        this.router.get("/promo/:id",
        checkTokens.HeaderCheck,
        PromosController.getPromoById)
        
        this.router.post("/promo",
        checkTokens.HeaderCheck,
        PromosController.postPromo)
        
        this.router.put("/promo",
        checkTokens.HeaderCheck,
        PromosController.updatePromo)
        
        this.router.delete("/promo/:id",
        checkTokens.HeaderCheck,
        PromosController.deletePromo)

    }
 }

 export default new PromoRoutes().router;