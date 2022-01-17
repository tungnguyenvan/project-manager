import Express from "express";
import RequestField from "framework/consts/RequestField";
import RouterValidate from "framework/util/RouterValidate";
import BaseController from "./BaseController";
import BaseModel from "./BaseModel";
import BaseRepository from "./BaseRepository";
import DefaultRouterValidate from "./DefaultRouterValidate";
import IBaseDocument from "./document/IBaseDocument";
import IBaseMiddleware from "./inteface/IBaseMiddleware";
import IBaseRouter from "./inteface/IBaseRouter";

abstract class BaseRouter<T extends IBaseDocument, Q extends BaseController<T, BaseRepository<T, BaseModel<T>>>> implements IBaseRouter {
    protected _router: Express.Router;
    protected _middleware: IBaseMiddleware;
    protected _controller: Q;

    constructor(controller: Q) {
        this._router = Express.Router();
        this._controller = controller;

        this.initalize();
    }

    get router(): Express.Router {
        return this._router;
    }

    initalize(): void {
        this.initializeMiddleware();

        this.router.get('/', [
            new RouterValidate(
                DefaultRouterValidate.all,
                RequestField.QUERY
            ).validate,
            ...(this._middleware?.all ? this._middleware?.all : [])
        ],
            this._controller.all
        );

        this.router.post('/', [
            new RouterValidate(
                DefaultRouterValidate.save,
                RequestField.BODY
            ).validate,
            ...(this._middleware?.save ? this._middleware?.save : [])
        ], this._controller.save);

        this.router.get('/:id', [
            new RouterValidate(
                DefaultRouterValidate.get,
                RequestField.PARAMS
            ).validate,
            ...(this._middleware?.get ? this._middleware?.get : [])
        ], this._controller.get)

        this.router.put('/:id', [
            new RouterValidate(
                DefaultRouterValidate.update,
                RequestField.PARAMS
            ).validate,
            ...(this._middleware?.update ? this._middleware?.update : []),
            this._controller.idIsExist
        ], this._controller.update);

        this.router.delete('/:id', [
            new RouterValidate(
                DefaultRouterValidate.delete,
                RequestField.PARAMS
            ).validate,
            ...(this._middleware?.delete ? this._middleware?.delete : []),
            this._controller.idIsExist
        ], this._controller.delete)
    }

    initializeMiddleware(): void {
        this._middleware = {};
    }
}

export default BaseRouter;