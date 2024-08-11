import mongoose, { Document } from "mongoose";
import { Role } from "../../user/utils/enums/user.enum";

export interface ILandlord extends Document {
    userId: mongoose.Types.ObjectId;
    firstName: string;
    lastName: string;
    phone: string;
    companyName?: string;
    address?: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
      };
    role: Role
    profileImage?: string;
    verificationToken?: string;
    house?: mongoose.Types.ObjectId;
    tenants?: mongoose.Types.ObjectId;
    isProfileCompleted?: boolean;
    passwordResetToken?: string;
    passwordResetExpires?: Date;
    passwordResetRetries?: number;
    passwordChangedAt?: Date
}

