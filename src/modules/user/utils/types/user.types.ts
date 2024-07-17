import { Document, Types } from "mongoose";
import { Role } from "../enums/user.enum";


interface Tenant {

}

export interface IUser extends Document {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: Number;
    state: string;
    password: string;
    profileImage: string;
    role: Role;
    // userType: UserType;
    isEmailVerified: boolean;
    // isPhoneNumberVerified: boolean;
    verificationToken: string;
    house: Types.ObjectId;
    tenants: Types.ObjectId
    isProfileCompleted: boolean;
    passwordResetToken: string;
    passwordResetExpires: Date;
    passwordResetRetries: number;
    passwordChangedAt: Date
}