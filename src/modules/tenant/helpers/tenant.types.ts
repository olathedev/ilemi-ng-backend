import { Document, Types } from "mongoose";

export interface ITenant extends Document {
    _id?: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: Number;
    state?: string;
    profileImage?: string;
    isProfileCompleted?: boolean;
    house?: Types.ObjectId;
    landlord: Types.ObjectId
    space?: Types.ObjectId;
    isEmailVerified?: boolean;
}