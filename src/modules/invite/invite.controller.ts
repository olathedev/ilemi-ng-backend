import { NextFunction, Request, Response, Router } from "express";
import { controller } from "../../shared/types";
import authMiddleware from "../../middlewares/auth.middleware";
import { Role } from "../user/utils/enums/user.enum";
import validate from "../../shared/utils/validator.util";
import { inviteValidationSchema } from "./dto/invite.dto";
import inviteService from "./invite.service";

export class InviteControllers implements controller {
    public path: string = '/invite'
    public router: Router = Router()

    constructor() {
        this.loadRoutes()
    }

    public loadRoutes() {
        this.router.get(`${this.path}/health`, (req: Request, res: Response) => {
            res.status(200).json({
                message: "Invite service is working"
            })
        })

        this.router.post(`${this.path}/sendTenantInvite`,
            authMiddleware.authenticate, authMiddleware.authorizeRoles("LANDLORD"), validate(inviteValidationSchema),
            this.sendTenantInvite
        )

        this.router.get(`${this.path}/`,
            authMiddleware.authenticate, authMiddleware.authorizeRoles("LANDLORD"),
            this.getAllInvites
        )

        this.router.post(`${this.path}/acceptInvite`, this.acceptInvite)
    }

    public async sendTenantInvite(req: Request, res: Response, next: NextFunction) {
        const user = (req as any).user._id
        console.log(user)
        try {
            const response = await inviteService.sendTenantInvite({ ...req.body, user })
            res.status(response.statusCode).json(response)
        } catch (error) {
            next(error)
        }
    }

    public async getAllInvites(req: Request, res: Response, next: NextFunction) {
        const user = (req as any).user._id
        try {
            const response = await inviteService.getInvites({ user })
            res.status(response.statusCode).json(response)
        } catch (error) {
            next(error)
        }

    }

    public async acceptInvite(req: Request, res: Response, next: NextFunction) {

        try {
            const response = await inviteService.tenantAcceptInvite(req.body)
            res.status(response.statusCode).json(response)
        } catch (error) {
            next(error)
        }

    }
}