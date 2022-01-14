import Logger from "framework/system/Logger";
import AppUtil from "framework/util/AppUtil";
import Mongoose from "mongoose";
import IBaseDocument from "./document/IBaseDocument";
import IBaseModel from "./inteface/IBaseModel";

const NAME_SPACE = "BaseModel";

abstract class BaseModel<T extends IBaseDocument> implements IBaseModel<T> {
    protected _schema: Mongoose.Model<T>;

    constructor(schema: Mongoose.Model<T>) {
        this._schema = schema;

        this.all = this.all.bind(this);
    }

    abstract select(): string;

    populate() {
        return [
            {
                path: "updated_by",
                select: "_id lastName firstName phone_number email",
            },
            {
                path: "created_by",
                select: "_id lastName firstName phone_number email",
            },
        ];
    }

    count(): Promise<number> {
        try {
            Logger.debug(NAME_SPACE, `${NAME_SPACE}#count start`);
            return this._schema.countDocuments().exec();
        } finally {
            Logger.debug(NAME_SPACE, `${NAME_SPACE}#count end`);
        }
    }

    all(query: any, page: number, limit: number): Promise<T[]> {
        try {
            Logger.debug(NAME_SPACE, `${NAME_SPACE}#all start`);

            return this._schema
                .find(AppUtil.objectializeQueryParams(query))
                .sort({ created_at: -1 })
                .limit(Number(limit))
                .select(this.select())
                .populate(this.populate())
                .exec();
        } finally {
            Logger.debug(NAME_SPACE, `${NAME_SPACE}#all end`);
        }
    }

    save(document: T): Promise<T> {
        try {
            Logger.debug(NAME_SPACE, `${NAME_SPACE}#save start`);
            return this._schema.create(document);
        } finally {
            Logger.debug(NAME_SPACE, `${NAME_SPACE}#save end`);
        }
    }

    get(id: Mongoose.Types.ObjectId): Promise<T> {
        try {
            Logger.debug(NAME_SPACE, `${NAME_SPACE}#get start`);
            return this._schema
                .findById(id)
                .select(this.select())
                .populate(this.populate())
                .exec() as Promise<T>;
        } finally {
            Logger.debug(NAME_SPACE, `${NAME_SPACE}#get start`);
        }
    }

    update(id: Mongoose.Types.ObjectId, document: Mongoose.Document): any {
        try {
            Logger.debug(NAME_SPACE, `${NAME_SPACE}#update start`);
            return (this._schema as Mongoose.Model<Mongoose.Document>)
                .updateOne(
                    {
                        _id: id,
                    },
                    document
                )
                .exec();
        } finally {
            Logger.debug(NAME_SPACE, `${NAME_SPACE}#update end`);
        }
    }

    delete(id: Mongoose.Types.ObjectId): any {
        try {
            Logger.debug(NAME_SPACE, `${NAME_SPACE}#delete start`);
            return this._schema.deleteOne({ _id: id });
        } finally {
            Logger.debug(NAME_SPACE, `${NAME_SPACE}#delete end`);
        }
    }
}

export default BaseModel;