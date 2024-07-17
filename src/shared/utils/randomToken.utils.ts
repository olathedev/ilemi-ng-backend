import crypto from "crypto"
export const generateRandString = () => {
    return crypto.randomBytes(40).toString('hex')
}