import BaseSchema from "framework/data_access/schema/BaseSchema";
import IUserDocument from "../document/IUserDocument";

const document = {
    ...BaseSchema.schema,
    name: String
}

/**
 * User Schema
 * @author tung.nguyenvan
 */
const UserSchema = BaseSchema.initializeDocument<IUserDocument>("users", document);
export default UserSchema;