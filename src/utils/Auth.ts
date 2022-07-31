import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
require('dotenv')

class Auth {
    public static hash = (password: string): Promise<string> =>{
        return bcrypt.hash(password, 10);
    }

    public static ComparePws = async (text: string, ciphertext: string): Promise<boolean> =>{
       let res = await bcrypt.compare(text, ciphertext);
       return res
    }

    public static generateToken = (id: number ,username: string, password: string): string=>{
        console.log("tokensss111")
        const private_key: string = process.env.PRIVATE_KEY || "BEJ03"
        const token: string = jwt.sign({id, username, password}, private_key, { expiresIn: "1h" });
        console.log("tokensss", token)
        return token
    }

}

export default Auth;