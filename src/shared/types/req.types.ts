import { Request } from "express";
import { IJwtPayload } from "./jwt.types";

export interface IRequest extends Request {
    user: IJwtPayload
}