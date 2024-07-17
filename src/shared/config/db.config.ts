import mongoose from "mongoose";
import { logger } from "./logger.config";

const connect = async (mongo_uri: string) => {
    try {
        await mongoose.connect(mongo_uri)
        logger.info("Mongo db connected")
    } catch (error: any) {
        logger.error(error.message)
    }
}

export default connect