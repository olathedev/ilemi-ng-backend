import { Enviroment } from "../../shared/config"
import HttpException from "../../shared/exceptions/httpException.exception"
import { generateRandString } from "../../shared/utils"
import bcryptUtils from "../../shared/utils/bcrypt.utils"
import responseUtils from "../../shared/utils/response.utils"
import tenantModel from "../tenant/tenant.model"
import userModel from "../user/user.model"
import { Role } from "../user/utils/enums/user.enum"
import { InviteStatus } from "./helpers/invite.enums"
import { ITenantInvite } from "./helpers/invite.types"
import { InviteControllers } from "./invite.controller"
import InviteModel from "./InviteModel"

class InviteService {
    constructor() { }

    public async sendTenantInvite(payload: any) {
        // check if invite exists
        if (!payload.email || !payload.phoneNumber) {
            throw new HttpException(400, "Provide email and phone number", "Bad Request")
        }

        const isInvited = await InviteModel.findOne({
            $or: [{ email: payload.email }, { phoneNumber: payload.phoneNumber }]
        })

        if (isInvited?.status === InviteStatus.ACCEPTED) {
            throw new HttpException(400, "This tenant is already approved for your property, they can proceed to login", "Bad Request")
        }

        if (isInvited?.status === InviteStatus.PENDING) {
            throw new HttpException(400, "Invite already sent to this email or phoneNumber, we will resend a reminder email to this tenant", "Bad Request")
        }

        const inviteToken = generateRandString()

        const data = {
            firstName: payload.firstName,
            lastName: payload.lastName,
            email: payload.email,
            phoneNumber: payload.phoneNumber,
            landlord: payload.user,
            inviteToken
        }

        const invite = await InviteModel.create(data)

        return responseUtils.buildResponse({
            message: "Invite sent",
            invite
        }, 200)
    }

    public async getInvites(payload: {user: string}) {
        const invites = await InviteModel.find({ landlord: payload.user, status: InviteStatus.PENDING }).sort('-createdAt')
        return responseUtils.buildResponse({
            invites
        }, 200)
    }

    public async tenantAcceptInvite(payload: { inviteToken: string, email: string, password: string }) {
        const invite = await InviteModel.findOne({ inviteToken: payload.inviteToken, email: payload.email })
        console.log(invite)
        if (!invite) {
            throw new HttpException(400, "Invalid invite token", "Bad Request")
        }

        if (invite.inviteToken !== payload.inviteToken) {
            throw new HttpException(400, "Invalid invite tokennn", "Bad Request")
        }

        if (!payload.password || !payload.email) {
            throw new HttpException(400, "email and password are required", "Bad Request")

        }

        invite.status = InviteStatus.ACCEPTED
        invite.inviteToken = ''

        const hashedPassword = await bcryptUtils.hashpassword({ saltRounds: Enviroment.BCRYPT.SALT_ROUNDS, password: payload.password })

        const userData = {
            firstName: invite.firstName,
            lastName: invite.lastName,
            email: invite.email,
            phoneNumber: invite.phoneNumber,
            landlord: invite.landlord,
            isEmailVerified: true,
            password: hashedPassword,
            role: Role.TENANT
        }

        const user = await userModel.create(userData)
        if (!user) {
            throw new HttpException(500, "failed to create user, something went wrong", "INTERNAL_SERVER_ERROR")
        }
        const tenant = await tenantModel.create({
            firstName: invite.firstName,
            lastName: invite.lastName,
            email: invite.email,
            phoneNumber: invite.phoneNumber,
            landlord: invite.landlord,
        })

        await invite.save()

        return responseUtils.buildResponse({
            message: "You have accepted landlords invite, proceed to login to access your tenant board",
            tenant
        }, 200)

    }

    public deleteTenantInvite() {

    }

    public updateTenantInvite() {

    }
}

export default new InviteService()