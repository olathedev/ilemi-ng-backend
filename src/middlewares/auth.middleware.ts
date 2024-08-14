import { Request, Response, NextFunction } from "express";
import { decodeToken } from "../shared/utils";
import userModel from "../modules/user/user.model";
import HttpException from "../shared/exceptions/httpException.exception";
import { IUser } from "../modules/user/utils/types/user.types";

class AuthMiddleware {

    constructor() {
        this.authenticate = this.authenticate.bind(this);
        this.authorizeRoles = this.authorizeRoles.bind(this);
        // this.ownershipCheck = this.ownershipCheck.bind(this);
      }

    public async authenticate(req: Request, res: Response, next: NextFunction) {
        try {
            const token = this.extractTokenFromHeader(req)
            console.log(token);
            const decodedToken: any = decodeToken(token);
            const user = await this.getUserFromToken(decodedToken);
            (req as any).user = user
            console.log((req as any).user)
            next()
        } catch (error: any) {
            res.status(error.statusCode || 401).json({
                message: "Authentication failed",
                statusCode: error.statusCode || 401
            })
        }
    }

    

    public authorizeRoles(...roles: string[]) {
        return (req: Request, res: Response, next: NextFunction) => {
            const role = (req as any).user.role
            if (!roles.includes(role)) {
                throw new HttpException(403, "Unauthorized to access this route", "FORBIDDEN")
            }
            next()
        }
    }

    private extractTokenFromHeader(req: Request): string | null {
        const authHeader = req.headers.authorization;
        if(authHeader && authHeader.startsWith('Bearer')) {
            return authHeader.split(' ')[1]
        }
        return null
    }

    private async getUserFromToken(decodedToken: any): Promise<IUser> {
        const user = await userModel.findById(decodedToken.id).select('_id firstName lastName email role')
        if(!user) {
            throw new HttpException(401, "User not found", "Authentication failed")
        }
        return user;
    }
}

export default new AuthMiddleware
