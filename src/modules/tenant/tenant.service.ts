import HttpException from "../../shared/exceptions/httpException.exception";
import responseUtils from "../../shared/utils/response.utils";
import userModel from "../user/user.model";
import { Role } from "../user/utils/enums/user.enum";

class TenantService {
    
    constructor(
        private UserModel = userModel
    ) {}

    public async getAll() {
        const tenants = await this.UserModel.find({
            role: Role.TENANT
        }).select('firstName lastName email role')

        return responseUtils.buildResponse({
            message: "Success",
            data: tenants
        }, 200)
    }

    public async getOne(payload: any) {
        const { id } = payload

        const tenant = await this.UserModel.findOne({
            role: Role.TENANT,
            _id: id
        })

        if(!tenant) {
            throw new HttpException(400, 'No user found with the provided ID', "Bad request")
        }

        return responseUtils.buildResponse({
            data: tenant
        }, 200)
    }


    
}

export default new TenantService()