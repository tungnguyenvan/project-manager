import Express from "express";
import Constant from "framework/consts/Constant";
import ApiResponse from "framework/system/ApiResponse";
import Logger from "framework/system/Logger";
import BaseModel from "./BaseModel";
import BaseRepository from "./BaseRepository";
import IBaseDocument from "./document/IBaseDocument";
import IMetaData from "./document/IMetaData";
import IBaseController from "./inteface/IBaseController";

const NAME_SPACE = "BaseController";

abstract class BaseController<T extends IBaseDocument, Q extends BaseRepository<T, BaseModel<T>>> implements IBaseController<T> {
    protected _repository: Q;

    constructor(repository: Q) {
        this._repository = repository;

        this.all = this.all.bind(this);
        this.withMetaData = this.withMetaData.bind(this);
        this.save = this.save.bind(this);
        this.catchError = this.catchError.bind(this);
        this.get = this.get.bind(this);
        this.update = this.update.bind(this);
        this.idIsExist = this.idIsExist.bind(this);
        this.delete = this.delete.bind(this);
    }

    all(request: Express.Request, response: Express.Response): void {
        try {
            Logger.debug(NAME_SPACE, `${NAME_SPACE}#all start`);
            this._repository.all(request).then(data => {
                this.withMetaData(request, response, data);
            })
        } finally {
            Logger.debug(NAME_SPACE, `${NAME_SPACE}#all end`);
        }
    }

    withMetaData(request: Express.Request, response: Express.Response, data: T[]): void {
        try {
            Logger.debug(NAME_SPACE, `${NAME_SPACE}#withMetaData start`);
            this._repository.count().then(count => {
                const metaData: IMetaData = {
                    page: Number(request.query.page) || 1,
                    page_total: Math.ceil(
                        Number(count) / Number(request.query.limit || Constant.REQUEST_ALL_LIMIT)
                    ),
                    count,
                    limit: Number(request.query.limit || Constant.REQUEST_ALL_LIMIT)
                }

                ApiResponse.ok(request, response, data, metaData);
            })
        } finally {
            Logger.debug(NAME_SPACE, `${NAME_SPACE}#withMetaData end`);
        }
    }

    save(request: Express.Request, response: Express.Response): void {
        try {
            Logger.debug(NAME_SPACE, `${NAME_SPACE}#save start`);
            this._repository.save(request).then((data: T) => {
                if (!data._id) {
                    ApiResponse.conflict(request, response);
                } else {
                    ApiResponse.created(request, response, data);
                }
            })
        } catch (error: any) {
            Logger.error(NAME_SPACE, `${NAME_SPACE}#save`, error);
            this.catchError(request, response, error);
        } finally {
            Logger.debug(NAME_SPACE, `${NAME_SPACE}#save end`);
        }
    }

    catchError(request: Express.Request, response: Express.Response, error: any): void {
        try {
            Logger.debug(NAME_SPACE, `${NAME_SPACE}#catchError start`, error);
            ApiResponse.internalServerError(request, response);
        } finally {
            Logger.debug(NAME_SPACE, `${NAME_SPACE}#catchError end`,);
        }
    }

    get(request: Express.Request, response: Express.Response): void {
        try {
            Logger.debug(NAME_SPACE, `${NAME_SPACE}#get start`);
            this._repository.get(request).then(data => {
                ApiResponse.ok(request, response, data);
            }).catch(error => {
                Logger.error(NAME_SPACE, `${NAME_SPACE}#get`, error);
                this.catchError(request, response, error);
            })
        } catch (error) {
            Logger.error(NAME_SPACE, `${NAME_SPACE}#get`, error);
            this.catchError(request, response, error);
        } finally {
            Logger.debug(NAME_SPACE, `${NAME_SPACE}#get end`);
        }
    }

    idIsExist(request: Express.Request, response: Express.Response, next: Express.NextFunction): void {
        try {
            Logger.debug(NAME_SPACE, `${NAME_SPACE}#idIsExist start`);
            this._repository.get(request).then(data => {
                if (data && data._id) {
                    return next();
                }

                ApiResponse.noContent(request, response);
            })
        } catch (error) {
            Logger.error(NAME_SPACE, `${NAME_SPACE}#update`, error);
            this.catchError(request, response, error);
        } finally {
            Logger.debug(NAME_SPACE, `${NAME_SPACE}#idIsExist end`);
        }
    }

    update(request: Express.Request, response: Express.Response): void {
        try {
            Logger.debug(NAME_SPACE, `${NAME_SPACE}#update start`);
            this._repository.update(request).then(data => {
                if ((data as any).modifiedCount > 0) {
                    return this.get(request, response);
                }
                ApiResponse.notModified(request, response);
            }).catch(error => {
                Logger.error(NAME_SPACE, `${NAME_SPACE}#update`, error);
                this.catchError(request, response, error);
            })
        } catch (error) {
            Logger.error(NAME_SPACE, `${NAME_SPACE}#update`, error);
            this.catchError(request, response, error);
        } finally {
            Logger.debug(NAME_SPACE, `${NAME_SPACE}#update end`);
        }
    }

    delete(request: Express.Request, response: Express.Response): void {
        try {
            Logger.debug(NAME_SPACE, `${NAME_SPACE}#update start`);
            this._repository.get(request).then(getData => {
                this._repository.delete(request).then(deleteData => {
                    if ((deleteData as any).deletedCount > 0) {
                        return ApiResponse.ok(request, response, getData);
                    }

                    ApiResponse.notModified(request, response);
                }).catch(error => {
                    Logger.error(NAME_SPACE, `${NAME_SPACE}#delete`, error);
                    this.catchError(request, response, error);
                })
            }).catch(error => {
                Logger.error(NAME_SPACE, `${NAME_SPACE}#delete`, error);
                this.catchError(request, response, error);
            })
        } catch (error) {
            Logger.error(NAME_SPACE, `${NAME_SPACE}#delete`, error);
            this.catchError(request, response, error);
        } finally {
            Logger.debug(NAME_SPACE, `${NAME_SPACE}#update end`);
        }
    }
}

export default BaseController;