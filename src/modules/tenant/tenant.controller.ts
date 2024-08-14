import { NextFunction, Request, Response, Router } from "express";
import { controller } from "../../shared/types";
import tenantService from "./tenant.service";
import authMiddleware from "../../middlewares/auth.middleware";
import { Role } from "../user/utils/enums/user.enum";

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

        this.router.get(`${this.path}/health`, (req: Request, res: Response) => {
            res.status(200).json({
                message: "Tenant Service, works"
            })
        })
        
        // this.router.use(authMiddleware.authenticate)
        this.router.get(`${this.path}/`, authMiddleware.authenticate, authMiddleware.authorizeRoles(Role.LANDLORD), this.getAll)
        this.router.get(`${this.path}/:id`, this.getOne)
        this.router.post(`${this.path}/create`)
        this.router.post(`${this.path}/send-tenant-invite`)
    }

    public async getAll(req: Request, res: Response, next: NextFunction) {
        const user = (req as any).user._id
        console.log(user)
        try {
            const response = await tenantService.getAll(user)
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