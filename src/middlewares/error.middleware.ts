import { Request, Response, NextFunction } from "express";

export const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
    let statusCode = error.statusCode || 500
    let message = error.message || "Something went wrong"

    if(error.name === 'CastError' && error.kind === 'ObjectId') {
        message = `${error.value} is not a valid id`
        statusCode = 404
    }
    res.status(statusCode).json({
        status: error.status || "Bad request",
        message: message,
        statusCode: statusCode || 500
    })
}