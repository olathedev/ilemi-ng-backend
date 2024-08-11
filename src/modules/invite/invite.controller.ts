import { Request, Response, Router } from "express";
import { controller } from "../../shared/types";

export class InviteControllers implements controller {
    public path: string = '/invite'
    public router: Router = Router()

    constructor() {
        this.loadRoutes()
    }

    public loadRoutes() {
        this.router.get(`${this.path}/`, (req: Request, res: Response) => {
            res.status(200).json({
                message: "Invite service is working"
            })
        })

        this.router.post(`${this.path}/sendInvite`)
    }
}