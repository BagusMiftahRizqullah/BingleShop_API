require('dotenv');
import { Router, Request, Response, } from "express";
import { sequelize } from "../models";
import RouterI from "./RouterInterface";
//Controllers
import LoginController from "../controllers/LoginController";

 class LoginRoutes implements RouterI {
    public router: Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    public routes(): void {
        // this.router.get("/login", LoginController.index)
        this.router.post("/login", LoginController.signin)
        this.router.post("/signup", LoginController.signup)

    }
 }

 export default new LoginRoutes().router;