require('dotenv');
import { Router, Request, Response } from "express";
// import RouterI from "./RouterInterface";
//Controllers
import UsersController from "../controllers/UsersController";
const checkTokens= require('../middlewares/checkTokenMiddleware')

 class UsersRoutes  {
    public router: Router;
    // public request: Request;
    // public response: Response;

    constructor(){
        this.router = Router();
       
        // this.request =  req;
        // this.response =  res;
    
        this.routes();
    }

    public routes(): void {
        this.router.get("/users",
            checkTokens.HeaderCheck,
            UsersController.getUser)
        this.router.get("/users/:id",
            checkTokens.HeaderCheck,
            UsersController.getUserById)
        this.router.put("/users",
            checkTokens.HeaderCheck,
            UsersController.updateUser)
        this.router.delete("/users/:id",
            checkTokens.HeaderCheck,
            UsersController.deleteUser)
      

    }
 }

 export default new UsersRoutes().router