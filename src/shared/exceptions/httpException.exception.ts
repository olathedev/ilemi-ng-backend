export default class HttpException extends Error {
    public statusCode: number
    public status: string

    constructor(statusCode: number, message: string, status: string){
        super(message)
        this.statusCode = statusCode
        this.status = status
    }
}