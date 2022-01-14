import Express from "express";
import IBaseDocument from "../document/IBaseDocument";

interface IBaseController<T extends IBaseDocument> {
    all(request: Express.Request, response: Express.Response): void;
    withMetaData(request: Express.Request, response: Express.Response, data: T[]): void;
    save(request: Express.Request, response: Express.Response): void;
    catchError(request: Express.Request, response: Express.Response, error: any): void;
    get(request: Express.Request, response: Express.Response): void;

    idIsExist(request: Express.Request, response: Express.Response, next: Express.NextFunction): void;
    update(request: Express.Request, response: Express.Response): void;
    delete(request: Express.Request, response: Express.Response): void;
}

export default IBaseController;