import Express from "express";
import FrameworkApplication from "framework/FrameworkApplication";
import ApiResponse from "framework/system/ApiResponse";
import ProjectMemberRouter from "./api/router/ProjectMemberRouter";
import ProjectRouter from "./api/router/ProjectRouter";

FrameworkApplication.instance.apiApplication.use("/info", (request: Express.Request, response: Express.Response, next: Express.NextFunction) => {
    ApiResponse.ok(request, response, {
        message: 'Api v.0.0.1'
    });
});

FrameworkApplication.instance.apiApplication.use('/project', new ProjectRouter().router);
FrameworkApplication.instance.apiApplication.use('/project_member', new ProjectMemberRouter().router);

export default FrameworkApplication.instance.apiApplication;