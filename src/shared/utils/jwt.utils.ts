import * as jwt from "jsonwebtoken"
import { IJwtPayload } from "../types/jwt.types"
import { Enviroment } from "../config"

export const generateToken = (jwtPayload: IJwtPayload) => {
    return jwt.sign(jwtPayload, Enviroment.JWT.SECRET, {
        expiresIn: Enviroment.JWT.EXPIRES_IN
    })
}

export const decodeToken = (token: any): string | jwt.JwtPayload => {
    console.log(jwt.verify(token, Enviroment.JWT.SECRET))
    return jwt.verify(token, Enviroment.JWT.SECRET)
}
