import HttpException from "../../shared/exceptions/httpException.exception"
import { generateRandString } from "../../shared/utils"
import responseUtils from "../../shared/utils/response.utils"
import { InviteStatus } from "./helpers/invite.enums"
import { ITenantInvite } from "./helpers/invite.types"
import { InviteControllers } from "./invite.controller"
import InviteModel from "./InviteModel"

class InviteService {
    constructor() { }

    public async sendTenantInvite(payload: ITenantInvite) {
        // check if invite exists
        if (!payload.email || !payload.phoneNumber) {
            throw new HttpException(400, "Provide email and phone number", "Bad Request")
        }

        const isInvited = await InviteModel.findOne({
            $or: [{ email: payload.email }, { phoneNumber: payload.phoneNumber }]
        })

        if(isInvited?.status === InviteStatus.ACCEPTED) {
            throw new HttpException(400, "This tenant is already approved for your property", "Bad Request")
        }

        if(isInvited?.status === InviteStatus.PENDING) {
            throw new HttpException(400, "Invite already sent to this email or phoneNumber, we will resend a reminder email to this tenant", "Bad Request")
        }

        payload.inviteToken = generateRandString()
        
        const invite = await InviteModel.create(payload)

        return responseUtils.buildResponse({
            message: "Invite sent",
            invite
        }, 200)
    }

    public tenantAcceptInvite() {

    }

    public deleteTenantInvite() {

    }

    public updateTenantInvite() {

    }
}

export default new InviteService()