import bcrypt from "bcryptjs"
import { IpasswordComparePayload, IPasswordHashPayload } from "../types";

class BcryptUtils {
    public async hashpassword({ saltRounds, password }: IPasswordHashPayload) {
        const salt = await bcrypt.genSalt(saltRounds)
        return await bcrypt.hash(password, salt)
    }

    public async comparePassword({candidatePassword, hash }: IpasswordComparePayload) {
        return await bcrypt.compare(candidatePassword, hash)
    }
}

export default new BcryptUtils()