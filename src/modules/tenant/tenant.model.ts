import { model, Schema } from "mongoose";
import { ITenant } from "./helpers";

const TenantSchema = new Schema<ITenant>({
    firstName: {
        type: String,
        required: [true, "FirstName is required"],
    },
    lastName: {
        type: String,
        required: [true, "LastName is required"],
    },
    email: {
        type: String,
        required: [true, 'Email field is required'],
        unique: true,
        lowercase: true,
        trim: true,
    },
    state: {
        type: String,
    },
    phoneNumber: {
        type: Number,
        sparse: true
    },
    landlord: {
        type: Schema.Types.ObjectId,
        ref: "Landlord",
        required: true
    },
    profileImage: {
        type: String,
        default: ''
    },
    isProfileCompleted: {
        type: Boolean,
        default: false
    },
    house: {
        type: Schema.Types.ObjectId,
        ref: "House"
    },
    space: {
        type: Schema.Types.ObjectId,
        ref: "Space"
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true
})

export default model<ITenant>('Tenant', TenantSchema)
