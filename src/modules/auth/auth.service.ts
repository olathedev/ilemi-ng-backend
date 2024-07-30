import userModel from "../user/user.model";
import { IUser } from "../user/utils/types/user.types";
import HttpException from "../../shared/exceptions/httpException.exception";
import bcryptUtils from "../../shared/utils/bcrypt.utils";
import { Enviroment, logger } from "../../shared/config";
import responseUtils from "../../shared/utils/response.utils";
import { IJwtPayload } from "../../shared/types/jwt.types";
import { generateRandString, generateToken } from "../../shared/utils";
import { generateOtp } from "./helpers";

class AuthService {
    constructor(
        private UserModel = userModel,
        private Bcrypt = bcryptUtils
    ) { }

    public async signUp(payload: IUser) {
        const { email, password } = payload

        if (!email || !password) {
            throw new HttpException(422, 'Incomplete signup Data', "Bad request")
        }

        // check if user exists
        const foundUser = await this.UserModel.findOne({ email })
        if (foundUser) {
            throw new HttpException(400, 'User already registered', "Bad request")
        }

        // hash user password
        const hashPassword = await this.Bcrypt.hashpassword({ saltRounds: Enviroment.BCRYPT.SALT_ROUNDS, password })
        payload.password = hashPassword

        const verificationToken = generateOtp()
        // logger.info("verificationToken", verificationToken)
        payload.verificationToken = verificationToken.otp

        const user = await this.UserModel.create(payload)
        logger.info("New account created")

        // const accessToken = generateToken(tokenPayload)

        return responseUtils.buildResponse({
            message: "User registeration success, check email for account verification steps",
            data: {
                firstname: user.firstName,
                lastname: user.lastName,
                email: user.email,
                otp: user.verificationToken
            }
        }, 201)
    }

    public async login(payload: { email: string, password: string }) {
        if (!payload.email || !payload.password) {
            throw new HttpException(422, 'Incomplete login Data', "Bad request")
        }

        const foundUser: any = await this.UserModel.findOne({ email: payload.email })

        if (!foundUser) {
            throw new HttpException(400, 'provided credentials do not match our records.', "Bad request")
        }

        const passwordCorrect = await bcryptUtils.comparePassword({ candidatePassword: payload.password, hash: foundUser.password})
        if(!passwordCorrect) {
            throw new HttpException(400, 'Password is not correct', "Bad request")
        }

        if(!foundUser.isEmailVerified) {
            throw new HttpException(400, 'Account not verified, check email for Otp', "ACCOUNT_NOT_VERIFIED")
        }

        const tokenPayload: IJwtPayload = {
            id: foundUser._id,
            email: foundUser.email,
            role: foundUser.role
        }

        const accessToken = generateToken(tokenPayload)
        logger.info(foundUser.firstName, "user created")

        const loginData = {
            firstname: foundUser.firstName,
            lastname: foundUser.lastName,
            email: foundUser.email,
            role: foundUser.role
        }

        return responseUtils.buildResponse({
            message: "Login successful",
            accessToken,
            data: loginData
        }, 200)

    }

    public async verifyOtp(payload: any) {
        const {email, otp} = payload

        if (!email || !otp) {
            throw new HttpException(400, 'account verification failed', "Bad request")
        }
        const foundUser = await this.UserModel.findOne({
            email,
            verificationToken: otp
        })

        if(!foundUser) {
            throw new HttpException(400, 'Account verification failed', "Bad request")
        }

        foundUser.verificationToken = ''
        foundUser.isEmailVerified = true
        foundUser.save()

        return responseUtils.buildResponse({
            message: "Email verification complete",
        }, 200)

    }

    public async getUser(payload: string) {
        const user = await this.UserModel.findOne({ _id: payload })
        return responseUtils.buildResponse({
            user
        }, 200)
    }


}


export default new AuthService()