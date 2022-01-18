import Express from "express";
import Constant from "framework/consts/Constant";
import Logger from "framework/system/Logger";
import Mongoose from "mongoose";
import BaseModel from "./BaseModel";
import IBaseDocument from "./document/IBaseDocument";
import IBaseRepository from "./inteface/IBaseRepository";

const NAME_SPACE = "BaseRepository";

abstract class BaseRepository<T extends IBaseDocument, Q extends BaseModel<T>> implements IBaseRepository<T> {
    protected _model: Q;

    constructor(model: Q) {
        this._model = model;

        this.all = this.all.bind(this);
    }

    count(): Promise<number> {
        try {
            Logger.debug(NAME_SPACE, `${NAME_SPACE}#count start`);
            return this._model.count();
        } finally {
            Logger.debug(NAME_SPACE, `${NAME_SPACE}#count end`);
        }
    }

    all(request: Express.Request): Promise<T[]> {
        try {
            Logger.debug(NAME_SPACE, `${NAME_SPACE}#all start`);

            let page: number = Constant.DEFAULT_PAGE_INDEX;
            let limit: number = Constant.REQUEST_ALL_LIMIT;

            if (request.query.page) {
                page = request.query.page as unknown as number;
            }

            if (request.query.limit) {
                limit = request.query.limit as unknown as number;
            }

            return this._model.all(request.query, page, limit);
        } finally {
            Logger.debug(NAME_SPACE, `${NAME_SPACE}#all end`);
        }
    }

    save(request: Express.Request): any {
        try {
            Logger.debug(NAME_SPACE, `${NAME_SPACE}#save start`);

            if ((request as any).auth) {
                request.body.created_by = (request as any).auth._id;
                request.body.updated_by = (request as any).auth._id;
            }

            return this._model.save(request.body as T);
        } finally {
            Logger.debug(NAME_SPACE, `${NAME_SPACE}#save end`);
        }
    }

    get(request: Express.Request): Promise<T> {
        try {
            Logger.debug(NAME_SPACE, `${NAME_SPACE}#get start`);
            return this._model.get(new Mongoose.Types.ObjectId(request.params.id));
        } finally {
            Logger.debug(NAME_SPACE, `${NAME_SPACE}#get end`);
        }
    }

    update(request: Express.Request): Promise<T> {
        try {
            Logger.debug(NAME_SPACE, `${NAME_SPACE}#update start`);

            if ((request as any).auth) {
                request.body.updated_by = (request as any).auth._id;
            }

            return this._model.update(new Mongoose.Types.ObjectId(request.params.id), request.body);
        } finally {
            Logger.debug(NAME_SPACE, `${NAME_SPACE}#update end`);
        }
    }

    delete(request: Express.Request): Promise<T> {
        try {
            Logger.debug(NAME_SPACE, `${NAME_SPACE}#delete start`);
            return this._model.delete(new Mongoose.Types.ObjectId(request.params.id));
        } finally {
            Logger.debug(NAME_SPACE, `${NAME_SPACE}#delete end`);
        }
    }
}

export default BaseRepository;