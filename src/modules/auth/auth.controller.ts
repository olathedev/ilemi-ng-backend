import { NextFunction, Request, Response, Router } from "express";
import { controller } from "../../shared/types";
import authService from "./auth.service";
import validate from "../../shared/utils/validator.util";
import { userValidationSchema } from "./helpers/validators";

class AuthControllers implements controller{
    public path: string = '/auth';
    public router: Router = Router()

    constructor() {
        this.loadRoutes()
    }

    public loadRoutes() {

        this.router.get(`${this.path}/`, (req: Request, res: Response) => {
            res.status(200).json({ message: "Auth Service is working" })
        })

        this.router.post(`${this.path}/register`, validate(userValidationSchema), this.signUp)
        this.router.post(`${this.path}/login`, this.signin)
        this.router.post(`${this.path}/login`, this.signin)
        this.router.post(`${this.path}/verify-otp`, this.verifyOtp)
    }

    public async signUp(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await authService.signUp(req.body)
            res.status(200).json(user)
        } catch (error) {
            next(error)
        }
    }  
    
    public async signin(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await authService.login(req.body)
            res.status(200).json(user)
        } catch (error) {
            next(error)
        }
    }

    public async verifyOtp(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await authService.verifyOtp(req.body)
            res.status(200).json(user)
        } catch (error) {
            next(error)
        }
    }
}

export default AuthControllers