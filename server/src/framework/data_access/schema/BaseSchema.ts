import IBaseDocument from "framework/core/document/IBaseDocument";
import Mongoose, { Schema } from "mongoose";

class BaseSchema {
    static get schema() {
        return {
            _id: Mongoose.Types.ObjectId,

            created_at: Number,

            created_by: {
                type: Mongoose.Types.ObjectId,
                ref: "users",
            },

            updated_at: Number,

            updated_by: {
                type: Mongoose.Types.ObjectId,
                ref: "users",
            },

            deleted_at: Number,

            deleted_by: {
                type: Mongoose.Types.ObjectId,
                ref: "users",
            },
        }
    }

    static initializeDocument<T extends IBaseDocument>(name: string, schemaDocument: any) {
        const schema = new Mongoose.Schema(schemaDocument)
            .pre("save", this.preSave)
            .pre("updateOne", this.preUpdate);
        return Mongoose.model<T>(name, schema);
    }

    static preSave(this: IBaseDocument, next: (error?: Mongoose.NativeError) => void): void {
        this._id = new Mongoose.Types.ObjectId();
        const now = Date.now();
        this.updated_at = now;
        this.created_at = now;
        this.deleted_at = undefined;

        next();
    }

    static preUpdate(this: IBaseDocument, next: (error?: Mongoose.NativeError) => void): void {
        const now = Date.now();
        this.update({ updatedAt: now });
        next();
    }
}

export default BaseSchema;