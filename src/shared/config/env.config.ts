import { IEnviroment } from "../types";
import dotenv from "dotenv"
dotenv.config()

export const Enviroment: IEnviroment = {
        APP: {
            NODE_ENV: process.env.NODE_ENV!,
            PORT: parseInt(process.env.PORT || '3000')
        }, 

        DB: {
            MONGO_URI: process.env.MONGO_URI!   
        },
        
        MAILING: {
            SENDGRID_API_KEY: process.env.SENDGRID_API_KEY!,
            SENDGRID_FROM: process.env.SENDGRID_FROM!
        },

        JWT: {
            SECRET: process.env.JWT_SECRET!,
            EXPIRES_IN: process.env.JWT_EXPIRES_IN!
        },

        BCRYPT: {
            SALT_ROUNDS: Number(process.env.SALTROUNDS)
        }
}