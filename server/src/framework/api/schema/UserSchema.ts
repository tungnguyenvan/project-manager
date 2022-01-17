import UserRole from "framework/consts/UserRole";
import UserStatus from "framework/consts/UserStatus";
import BaseSchema from "framework/data_access/schema/BaseSchema";
import Mongoose from "mongoose";
import IUserDocument from "../document/IUserDocument";

const document = {
    ...BaseSchema.schema,
    name: String,

    email: String,

    password: String,

    status: {
        type: String,
        default: UserStatus.JUST_CREATED,
        enum: UserStatus
    },

    role: {
        type: String,
        default: UserRole.NONE,
        enum: UserRole
    },

    token: {
        type: String,
        default: 'Empty'
    },

    avatar: Mongoose.Types.ObjectId
}

/**
 * User Schema
 * @author tung.nguyenvan
 */
const UserSchema = BaseSchema.initializeDocument<IUserDocument>("users", document);
export default UserSchema;