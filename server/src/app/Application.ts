import Express from "express";
import FrameworkApplication from "framework/FrameworkApplication";
import ApiResponse from "framework/system/ApiResponse";

FrameworkApplication.instance.apiApplication.use("/info", (request: Express.Request, response: Express.Response, next: Express.NextFunction) => {
    ApiResponse.ok(request, response, {
        message: 'Api v.0.0.1'
    });
});


export default FrameworkApplication.instance.apiApplication;