import { NextFunction, Request, Response, Router } from "express";
import { controller } from "../../shared/types";
import { authenticate } from "../../middlewares";
import validate from "../../shared/utils/validator.util";
import { HouseValidationSchema } from "./helpers";
import houseService from "./house.service";

class HouseContollers implements controller {
    public path: string = '/house';
    public router: Router = Router()

    constructor() {
        this.loadRoutes()
    }

    private loadRoutes() {
        this.router.get(`${this.path}/`, authenticate, (req: Request, res: Response) => {
            res.status(200).json({
                message: "House service works"
            })
        })

        this.router.post(`${this.path}/create`, authenticate, validate(HouseValidationSchema), this.createHouse)
        this.router.get(`${this.path}/get-all`, this.getAll)
        this.router.get(`${this.path}/get-all-landlords-house`, authenticate, this.getAllLandlordsHouse)


    }
    
    public async createHouse(req: Request, res: Response, next: NextFunction) {
        try {
            req.body.landlord = (req as any).user.id
            const response = await houseService.createHouse(req.body)
            res.status(201).json(response)
        } catch (error) {
            next(error)
        }
    }

    public async getAll(req: Request, res: Response, next: NextFunction) {
        const population = req.query.populate
        try {
            const response = await houseService.getAll({ population })
            res.status(response.statusCode).json(response)
        } catch (error) {
            next(error)
        }
    }

    public async getAllLandlordsHouse(req: Request, res: Response, next: NextFunction) {
        const user = (req as any).user.id
        try {
            const response = await houseService.getAllLandlordsHouse(user)
            res.status(response.statusCode).json(response)
        } catch (error) {
            next(error)
        }
    }
}


export default HouseContollers