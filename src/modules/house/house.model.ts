import { model, Schema } from "mongoose";
import { IHouse } from "./helpers";

const HouseSchema = new Schema<IHouse>({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    images: {
        type: [String],
        required: true,
    },
    rentFee: {
        type: Number,
        default: 0.00
    },
    landlord: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    tenants:[
        {type: Schema.Types.ObjectId, ref: "Tenant"}
     ],
}, {
    timestamps: true
})

export default model<IHouse>('House', HouseSchema)
