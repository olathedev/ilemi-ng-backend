import { Document } from "mongoose";
import { InviteStatus } from "./invite.enums";

export interface ITenantInvite extends Document {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    inviteToken: string;
    status: InviteStatus
  }