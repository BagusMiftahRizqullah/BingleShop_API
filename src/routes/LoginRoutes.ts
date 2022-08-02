require('dotenv');
import { Router, Request, Response, } from "express";

//Controllers
import LoginController from "../controllers/LoginController";


const validation = require('../middlewares/validationMiddleware')
const RegisterSchema = require('../validations/registerSchema')
const LoginSchema = require('../validations/loginSchema')

 class LoginRoutes  {
    public router: Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    public routes(): void {
        
        this.router.post("/login",
        validation(LoginSchema),
        LoginController.signin)

        this.router.post("/signup", 
        validation(RegisterSchema), 
        LoginController.signup)

    }
 }

 export default new LoginRoutes().router;