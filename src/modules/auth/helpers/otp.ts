import crypto from "crypto"

export const generateOtp = () => {
    const otp = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

    return { otp, expiresAt}
}