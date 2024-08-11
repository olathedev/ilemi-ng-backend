import { Document, Types } from "mongoose";
import { Role } from "../enums/user.enum";


interface Tenant {
    
}

export interface IUser extends Document {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: Role;
    isEmailVerified: boolean;
    isActive: boolean;
    lastLogin: Date;
    verificationToken?: string | number;
    verificationTokenExpires?: Date
}