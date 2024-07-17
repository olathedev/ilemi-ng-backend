import express, { Application, NextFunction, Request, Response } from "express"
import { controller } from "./shared/types"
import cors from "cors"
import morgan from "morgan"
import { errorHandler, notFound } from "./modules/middlewares"
import { Enviroment, logger } from "./shared/config"
import connect from "./shared/config/db.config"
import dotenv from "dotenv"
dotenv.config()


declare global {
    namespace Express {
        interface Request {
            userIp?: string
        }
    }
}

class App {
    private app: Application

    constructor(controllers: controller[]) {
        this.app = express()
        this.initMiddleWares()
        this.initControllers(controllers)
        this.initErroHandler()
    }

    public listen() {
        this.app.listen(4000, () => {
            connect('mongodb://localhost:27017/ilemi')
            logger.info(`=================================`);
			logger.info(`======= ENV: Dev ========`);
            logger.info(`🚀 Ilemi server is on standby for requests on port 4000 🚀`)
        })
    }

    private initControllers(controllers: controller[]) {
        this.app.get("/health", (req: Request, res: Response) => {
            res.status(200).json({ message: "Api is alive and breathing" })
        })
        controllers.forEach((controller) => {
            this.app.use('/api/v1/ilemi', controller.router)
            console.log(controller.path)
        })  
    }

    private initMiddleWares() {
        console.log("middlewares")
        const corsOption = {
            origin: '*'
        }

        this.app.use(cors(corsOption))
        this.app.use(express.json())
        this.app.use(morgan('dev'))

        // Get Ip request from requests
        // this.app.use((req: Request, res: Response, next: NextFunction) => {
        //     req.userIp = req.ip || req.socket.remoteAddress
        // })
    }

    private initErroHandler() {
        this.app.use(notFound)
        this.app.use(errorHandler)
    }


}

export default App