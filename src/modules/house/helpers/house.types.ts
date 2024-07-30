import { Document } from "mongoose";
import { Types } from "mongoose";

export interface IHouse extends Document {
    _id: string;
    title: string;
    description: string;
    rentFee: Number;
    tenants: Types.ObjectId[];
    landlord: Types.ObjectId;
    state: string;
    city: string;
    address: string;
    images: string[]
}