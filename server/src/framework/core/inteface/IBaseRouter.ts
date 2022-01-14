import Express from "express";

interface IBaseRouter {
    get router(): Express.Router;
    initalize(): void;
    initializeMiddleware(): void;
}

export default IBaseRouter;