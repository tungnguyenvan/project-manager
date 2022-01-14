import Express from "express";
import HttpRequestStatusCode from "../consts/HttpRequestStatusCode";
import IMetaData from "../core/document/IMetaData";
import IRequestError from "../core/document/IRequestError";

class ApiResponse {
    /**
     * Response with status ok
     * @param request
     * @param response
     * @param data
     */
    static ok(
        request: Express.Request,
        response: Express.Response,
        data: any,
        metaData?: IMetaData
    ): Express.Response {
        return response.status(HttpRequestStatusCode.OK).json({
            link: request.originalUrl,
            data,
            meta_data: metaData,
        });
    }

    /**
     * Response with status internal server error
     * @param request
     * @param response
     * @returns response
     */
    static internalServerError(
        request: Express.Request,
        response: Express.Response
    ): Express.Response {
        return response.status(HttpRequestStatusCode.INTERNAL_SERVER_ERROR).json({
            link: request.originalUrl,
            request_at: Date.now(),
        });
    }

    /**
     * Response with status created
     * @param request
     * @param response
     * @param data
     */
    static created(
        request: Express.Request,
        response: Express.Response,
        data: any
    ): Express.Response {
        return response.status(HttpRequestStatusCode.CREATED).json({
            link: request.originalUrl,
            data,
        });
    }

    /**
     * Response with status request error
     * @param request
     * @param response
     * @param error
     */
    static badRequest(
        request: Express.Request,
        response: Express.Response,
        error: IRequestError
    ): Express.Response {
        return response.status(HttpRequestStatusCode.BAD_REQUEST).json({
            link: request.originalUrl,
            error,
        });
    }

    /**
     * Response with status not found
     * @param request
     * @param response
     * @returns response
     */
    static notFound(request: Express.Request, response: Express.Response): Express.Response {
        return response.status(HttpRequestStatusCode.NOT_FOUND).json({
            link: request.originalUrl,
        });
    }

    /**
     * Response with status unAuthorized
     * @param request
     * @param response
     * @returns response
     */
    static unAuthorized(request: Express.Request, response: Express.Response): Express.Response {
        return response.status(HttpRequestStatusCode.UNAUTHORIZED).json({
            link: request.originalUrl,
        });
    }

    /**
     * Response with status conflic
     * @param request
     * @param response
     * @returns response
     */
    static conflict(request: Express.Request, response: Express.Response): Express.Response {
        return response.status(HttpRequestStatusCode.CONFLICT).json({
            link: request.originalUrl,
            data: request.body,
        });
    }

    /**
     * Response with status no content
     * @param request
     * @param response
     * @returns response
     */
    static noContent(request: Express.Request, response: Express.Response): Express.Response {
        return response.status(HttpRequestStatusCode.NO_CONTENT).json({
            link: request.originalUrl,
        })
    }

    /**
     * Response with status not modified
     * @param request
     * @param response
     * @returns response
     */
    static notModified(request: Express.Request, response: Express.Response): Express.Response {
        return response.status(HttpRequestStatusCode.NOT_MODIFIED).json({
            link: request.originalUrl,
        })
    }
}

export default ApiResponse;