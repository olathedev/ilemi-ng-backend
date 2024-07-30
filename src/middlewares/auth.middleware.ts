import { Request, Response, NextFunction } from "express";
import { IJwtPayload } from "../shared/types/jwt.types";
import { decodeToken } from "../shared/utils";
import userModel from "../modules/user/user.model";
import HttpException from "../shared/exceptions/httpException.exception";
import { IUser } from "../modules/user/utils/types/user.types";
import { IRequest } from "../shared/types";

// class AuthMiddleware {
//     public 
// }

// export default new AuthMiddleware

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization
    // console.log(authHeader)
    if(!authHeader || !authHeader.startsWith('Bearer')) {
        res.status(401).json({
            status: "Authentication failed",
            message: "bearer token not provided or not properly formated",
            statusCode: 401
        })
        return;
    }
    try {
        const token = authHeader?.split(" ")[1]
        const decodedToken: any = decodeToken(token);
        // const foundUser: IUser | null = await userModel.findById(decodedToken.id)
        // if(!foundUser) throw new HttpException(403, "Authentication failed", "")
        // req.user = { id: foundUser._id, email: foundUser.email, role: foundUser.role}
        (req as any).user = decodedToken
        next()
    } catch (error: any) {
        res.status(error.statusCode || 401).json({
            message: "Authentication failed",
            statusCode: error.statusCode || 401
        })
    }
}