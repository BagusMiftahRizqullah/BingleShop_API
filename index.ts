import express, { Application, Request, Response, NextFunction } from "express";
require('dotenv')

//Routes
import LoginRoutes from "./src/routes/LoginRoutes";
import UsersRoutes from "./src/routes/UsersRoutes";
import ItemsRoutes from "./src/routes/ItemsRoutes";
import OrderItemRouters from "./src/routes/OrderItemRouters";
import OrderRoutes from "./src/routes/OrderRoutes";
import PromoRoutes from "./src/routes/PromoRoutes";
import Payment_Routes from "./src/routes/Payment_Routes";

class App {
    public app: Application;


    constructor(){
        this.app = express();
        this.routes();
        
    }

    protected routes(): void {
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended: false}))
        const BASE_API = process.env.BASE_API +''
       
        // Routes
        this.app.use(BASE_API,LoginRoutes)
        this.app.use(BASE_API,UsersRoutes)
        this.app.use(BASE_API,ItemsRoutes)
        this.app.use(BASE_API,OrderItemRouters)
        this.app.use(BASE_API,OrderRoutes)
        this.app.use(BASE_API,PromoRoutes)
        this.app.use(BASE_API,Payment_Routes)

        
        //Validation Cannot find Endpoin
        this.app.use('*', (req: Request, res: Response, next:NextFunction) => {
            return res.status(404).json({
                status_code:404,
                message: 'endpoint not found'
            })
        })
        
    
    }


}



const db = require('./src/models')
const port = process.env.PORT || 8000
const app = new App().app;

app.listen(port, ()=>{
    console.log(`Server Running on Port ${port}`)
})

// db.sequelize.sync().then((req: Request)=>{
// })

// function group(arg0: string, arg1: (router: Application) => void) {
//     throw new Error("Function not implemented.");
// }

