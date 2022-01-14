import Mongoose from "mongoose";

interface IBaseDocument extends Mongoose.Document {
    _id: Mongoose.Types.ObjectId;

    created_at: number;
    created_by: Mongoose.Types.ObjectId;

    updated_at: number;
    updated_by: Mongoose.Types.ObjectId;

    deleted_at: number;
    deleted_by: Mongoose.Types.ObjectId;
}

export default IBaseDocument;