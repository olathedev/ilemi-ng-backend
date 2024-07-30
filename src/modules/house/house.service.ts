import HttpException from "../../shared/exceptions/httpException.exception";
import responseUtils from "../../shared/utils/response.utils";
import { IHouse } from "./helpers";
import houseModel from "./house.model";


// crud for house
// Be able to get House Dashboard(object should return every neccessary detail about the active house)
class HouseService {
    constructor(
        private HouseModel = houseModel
    ) {}

    public async createHouse(payload: Partial<IHouse>) {
        const house = await this.HouseModel.create(payload)
        return responseUtils.buildResponse({
            message: "New house successfully created",
            data: house,
        }, 201)
    }

    public async getAll(payload: any) {
        const house = await this.HouseModel.find().populate({ path: 'landlord', select: '_id firstName lastName email' })
        return responseUtils.buildResponse({
            data: house,
        }, 200)
    }

    public async getAllLandlordsHouse(payload: any) {
        const house = await this.HouseModel.find({ landlord: payload }).select("title description")
        return responseUtils.buildResponse({
            data: house,
        }, 200)
    }

    public async deleteHouse(payload: any) {
        const { id, user } = payload
        if(!id) {
            throw new HttpException(400, "provide a valid id", "Bad request")
        }
        const house = await this.HouseModel.findOneAndDelete({_id: id, landlord: user})
        return responseUtils.buildResponse({
            message: "House Deleted",
        }, 200)
    }
}

export default new HouseService()