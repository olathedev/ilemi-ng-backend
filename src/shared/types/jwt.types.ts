import { Role } from "../constants";

export interface IJwtPayload {
    id: string,
    email: string,
    role: Role
}