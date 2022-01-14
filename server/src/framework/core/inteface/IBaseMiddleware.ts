import Express from "express";

interface IBaseMiddleware {
    all?: ((
        request: Express.Request,
        response: Express.Response,
        next: Express.NextFunction
    ) => void)[];

    save?: ((
        request: Express.Request,
        response: Express.Response,
        next: Express.NextFunction
    ) => void)[];

    get?: ((
        request: Express.Request,
        response: Express.Response,
        next: Express.NextFunction
    ) => void)[];

    update?: ((
        request: Express.Request,
        response: Express.Response,
        next: Express.NextFunction
    ) => void)[];

    delete?: ((
        request: Express.Request,
        response: Express.Response,
        next: Express.NextFunction
    ) => void)[];
}

export default IBaseMiddleware;