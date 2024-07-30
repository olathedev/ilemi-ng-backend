import Joi from "joi";

export const HouseValidationSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    state: Joi.string().required(),
    rentFee: Joi.number().required(),
    city: Joi.string().required(),
    address: Joi.string().required(),
    images: Joi.array().required()
 })
