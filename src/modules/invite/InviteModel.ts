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
        required: true
    }
})

export default model<ITenantInvite>('Invites', InviteSchema)