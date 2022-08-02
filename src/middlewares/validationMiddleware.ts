import { Request, Response, NextFunction} from "express";


class validation {

   
    public  val = (schema: any) => async( req: Request, res: Response, next:NextFunction): Promise<void> =>{
       try {
        await schema.validateAsync(req.body)
        next()
   
       } catch (error: any){
        const message = error.details[0].message
        next({
            code: 400,
            message: message
        })

       }
    }

   

}

module.exports= new validation().val