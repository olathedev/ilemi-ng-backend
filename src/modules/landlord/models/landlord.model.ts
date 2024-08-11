import { Schema, model } from "mongoose";
import { ILandlord } from "../helpers/landlord.types";
import { Role } from "../../user/utils/enums/user.enum";

const LandlordSchema = new Schema<ILandlord>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    phone: {
        type: String,
    },

    companyName: {
        type: String
    },

    role: {
        type: String,
        enum: Object.values(Role),
        required: true
    },

    address: {
        street: { type: String },
        city: { type: String },
        state: { type: String},
        zipCode: { type: String},
        country: { type: String}
    },

    isProfileCompleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

export default model<ILandlord>('Landlord', LandlordSchema)