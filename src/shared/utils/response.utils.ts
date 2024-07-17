class ResponseUtils {
    public buildResponse(response: any, statusCode: number) {
        return {
            ...response,
            status: "Success",
            statusCode
        }
    }
}

export default new ResponseUtils()