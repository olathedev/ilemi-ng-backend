import { NextFunction, Request, Response, Router } from "express";
import { controller } from "../../shared/types";
import landlordService from "./landlord.service";
import authMiddleware from "../../middlewares/auth.middleware";

class LandlordControllers implements controller {
    public path: string = '/landlord';
    public router: Router = Router()

    constructor() {
        this.loadRoutes()
    }

    public loadRoutes() {
        this.router.get(`${this.path}/`, (req: Request, res: Response) => {
            res.status(200).json({ message: "Landlord Service is working" })
        })

        this.router.get(`${this.path}/getAll`, authMiddleware.authenticate, this.getAllLandlords)
        this.router.patch(`${this.path}/update`, authMiddleware.authenticate, this.updateLandlord)
        this.router.get(`${this.path}/:id`, authMiddleware.authenticate, this.getLandlord)
    }   
    
    public async getAllLandlords(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await landlordService.getLandlords()
            res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }

    public async getLandlord(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params
        try {
            const response = await landlordService.getSingleLandlord(id)
            res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }

    public async updateLandlord(req: Request, res: Response, next: NextFunction) {
        const id = (req as any).user.id
        try {
            const response = await landlordService.updateLandlord(id, req.body)
            res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }

    public async deleteLandlord() {
        try {

        } catch (error) {

        }
    }

}

export default LandlordControllers