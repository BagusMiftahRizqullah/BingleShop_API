import express, { Application, Request, Response, NextFunction } from "express";
import LoginRoutes from "./src/routes/LoginRoutes";
require('dotenv')


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
       
       
         
        //Validation Cannot find Endpoin
        this.app.use('*', (req: Request, res: Response, next:NextFunction) => {
            return res.status(404).json({
                status_code:404,
                message: 'endpoint not found'
            })
        })



         // Routes
         this.app.use(BASE_API,LoginRoutes)
    }


}



const db = require('./src/models')
const port = process.env.PORT || 8000
const app = new App().app;


db.sequelize.sync().then((req: Request)=>{
    app.listen(port, ()=>{
        console.log(`Server Running on Port ${port}`)
    })
})

// function group(arg0: string, arg1: (router: Application) => void) {
//     throw new Error("Function not implemented.");
// }

