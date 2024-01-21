class ApiResponse{
    constructor(statusCode, data, message = "Success"){
        this.data=data
        this.message=message
        this.statusCode=statusCode<400
        this.success=this.success
    }
}

export {ApiResponse}