import Express from "express";
import RateLimit from "express-rate-limit";
import jsonwebtoken from "jsonwebtoken";
import Constant from "../consts/Constant";
import AppUtil from "../util/AppUtil";
import ApiResponse from "./ApiResponse";
import Logger from "./Logger";

const NAME_SPACE = "ApiMiddleware";

class ApiMiddleware {
    static get rateLimit(): any {
        return RateLimit({
            windowMs: 60 * 60 * 1000, // 1 hrs in milliseconds
            max: Constant.MAX_REQUEST_PER_HOURS as number, // max request per hours
            message: `You have exceeded the ${Constant.MAX_REQUEST_PER_HOURS} requests in 1 hrs limit!`,
            headers: true,
        });
    }

    static cors(
        request: Express.Request,
        response: Express.Response,
        next: Express.NextFunction
    ): void {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setHeader(
            "Access-Control-Allow-Headers",
            "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
        );
        response.setHeader("Access-Control-Allow-Headers", "*");
        if (request.method === "OPTION") {
            response.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
        }
        next();
    }

    static auth(
        request: Express.Request,
        response: Express.Response,
        next: Express.NextFunction
    ): Express.Response {
        try {
            Logger.debug(NAME_SPACE, `${NAME_SPACE}#auth start`);
            if (!request.headers.authorization) {
                return ApiResponse.unAuthorized(request, response);
            }

            const authTokenSplied: string[] = AppUtil.splitToken(request.headers.authorization);
            if (authTokenSplied[0] !== Constant.AUTH_TOKEN_PREFIX) {
                return ApiResponse.unAuthorized(request, response);
            }

            jsonwebtoken.verify(
                authTokenSplied[1],
                Constant.JSON_WEB_TOKEN_KEY,
                (error, deconed) => {
                    if (error) {
                        return ApiResponse.unAuthorized(request, response);
                    }

                    (request as any).auth = deconed;
                    next();
                }
            );
        } catch (error) {
            Logger.error(NAME_SPACE, `${NAME_SPACE}#auth`, error);
            ApiResponse.internalServerError(request, response);
        } finally {
            Logger.debug(NAME_SPACE, `${NAME_SPACE}#auth end`);
        }
    }
}

export default ApiMiddleware;