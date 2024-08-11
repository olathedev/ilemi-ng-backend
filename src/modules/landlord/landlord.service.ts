import HttpException from "../../shared/exceptions/httpException.exception";
import responseUtils from "../../shared/utils/response.utils";
import landlordModel from "./models/landlord.model";

class LandlordServices {
    constructor(private LandlordModel = landlordModel) { }

    public async getLandlords() {
        const landlords = await this.LandlordModel.find()
        return responseUtils.buildResponse({
            landlords,
            totalCount: landlords.length
        }, 200)
    }

    public async getSingleLandlord(payload: string) {
        const landlord = await this.LandlordModel.findOne({ _id: payload })
        if (!landlord) {
            throw new HttpException(404, "No resource found with id - " + payload, "NOT FOUND")
        }

        return responseUtils.buildResponse({
            landlord
        }, 200)
    }

    public async updateLandlord(id: string, payload: any) {
        console.log(id);

        const landlord = await this.LandlordModel.findOneAndUpdate({ userId: id }, payload, {
            new: true,
            runValidators: true
        })

        if (!landlord) {
            throw new HttpException(404, "No record found with id - " + id, "NOT FOUND")
        }

        return responseUtils.buildResponse({
            message: "Landlord profile updated successfully",
            landlord
        }, 200)

    }
}


export default new LandlordServices()