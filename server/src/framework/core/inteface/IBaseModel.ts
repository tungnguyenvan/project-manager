import IBaseDocument from "../document/IBaseDocument";
import Mongoose from "mongoose";

interface IBaseModel<T extends IBaseDocument> {
    populate(): any;
    select(): string;
    count(): Promise<number>;

    all(query: any, page: number, limit: number): Promise<T[]>;
    save(document: T): Promise<T>;
    get(id: Mongoose.Types.ObjectId): Promise<T>
    update(id: Mongoose.Types.ObjectId, document: T): any;
    delete(id: Mongoose.Types.ObjectId): any;
}

export default IBaseModel;