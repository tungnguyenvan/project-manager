import BaseSchema from "framework/data_access/schema/BaseSchema";
import IFileDocument from "../document/IFileDocument";
import IUserDocument from "../document/IUserDocument";

const document = {
    ...BaseSchema.schema,
    url: String
}

/**
 * User Schema
 * @author tung.nguyenvan
 */
const FileSchema = BaseSchema.initializeDocument<IFileDocument>("files", document);
export default FileSchema;