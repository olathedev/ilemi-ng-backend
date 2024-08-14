import { model, Schema } from "mongoose";
import { ITenantInvite } from "./helpers/invite.types";
import { InviteStatus } from "./helpers/invite.enums";

const InviteSchema = new Schema<ITenantInvite>({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        enum: Object.values(InviteStatus),
        default: InviteStatus.PENDING
    },
    inviteToken: {
        type: String,
    },
    property: {
        type: Schema.Types.ObjectId,
        ref: "Property",
        // required: true 
    },
    landlord: {
        type: Schema.Types.ObjectId,
        ref: "Landlord",
        required: true 
    },
}, {timestamps: true})

export default model<ITenantInvite>('Invites', InviteSchema)