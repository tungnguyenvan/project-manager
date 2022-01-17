import BaseModel from "framework/core/BaseModel";
import Logger from "framework/system/Logger";
import IFileDocument from "../document/IFileDocument";
import FileSchema from "../schema/FileSchema";
import UserSchema from "../schema/UserSchema";

const NAME_SPACE = 'FileModel';

/**
 * File model
 * @author tung.nguyenvan
 */
class FileModel extends BaseModel<IFileDocument> {
    constructor() {
        super(FileSchema);
    }

    select(): string {
        return "-__v";
    }
}

export default FileModel;