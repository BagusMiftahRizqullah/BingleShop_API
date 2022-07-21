require('dotenv');
import { Router, Request, Response, } from "express";
import { sequelize } from "../models";
import RouterI from "./RouterInterface";
//Controllers
import UsersController from "../controllers/UsersController";

 class UsersRoutes implements RouterI {
    public router: Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    public routes(): void {
        this.router.get("/users", UsersController.getUser)
        this.router.get("/users/:id", UsersController.getUserById)
        this.router.put("/users", UsersController.updateUser)
        this.router.delete("/users/:id", UsersController.deleteUser)
      

    }
 }

 export default new UsersRoutes().router;