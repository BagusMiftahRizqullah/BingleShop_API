require('dotenv');
import { Router, Request, Response, } from "express";
import RouterI from "./RouterInterface";
//Controllers
import PromosController from "../controllers/PromosController";

 class PromoRoutes implements RouterI {
    public router: Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    public routes(): void {
        this.router.get("/promo", PromosController.getPromo)
        this.router.get("/promo/:id", PromosController.getPromoById)
        this.router.post("/promo", PromosController.postPromo)
        this.router.put("/promo", PromosController.updatePromo)
        this.router.delete("/promo/:id", PromosController.deletePromo)

    }
 }

 export default new PromoRoutes().router;