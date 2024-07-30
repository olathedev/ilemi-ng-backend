import { NextFunction, Request, Response, Router } from "express";
import { controller } from "../../shared/types";
import tenantService from "./tenant.service";

class TenatsControllers implements controller {
    public path: string = "/tenants"
    public router: Router = Router()

    constructor() {
        this.loadRoutes()
    }
    
    // @SERVICE DESC
    // GET ALL TENTNANTS
    // CREATE NEW TENANT
    // SEND INVITE TO TENANT
    // GET ONE TENTANT(ACTIVE, INACTIVE)
    // UPDATE TENANT RECORD

    public loadRoutes() {

        this.router.get(`${this.path}/`, (req: Request, res: Response) => {
            res.status(200).json({
                message: "Tenant Service, works"
            })
        })

        this.router.get(`${this.path}/get-all`, this.getAll)
        this.router.get(`${this.path}/get-one/:id`, this.getOne)
        this.router.post(`${this.path}/create-new`)
        this.router.post(`${this.path}/send-tenant-invite`)
    }

    public async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await tenantService.getAll()
            res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }

    public async getOne(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await tenantService.getOne({ id: req.params.id })
            res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }

    public async createNew(req: Request, res: Response, next: NextFunction) {
        try {
            
        } catch (error) {
            
        }
    }


}

export default TenatsControllers