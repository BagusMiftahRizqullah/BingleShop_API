import express, { Application, Request, Response } from "express";
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
        
        this.app.route("/tes").get((req: Request, res: Response)=>{
            res.send("Tes Halo")
        })

        this.app.use('/api/v1',LoginRoutes)


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

