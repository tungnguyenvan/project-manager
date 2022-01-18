import ProjectStatus from "app/consts/ProjectStatus";
import IBaseDocument from "framework/core/document/IBaseDocument";
import Mongoose from "mongoose";
import IProjectMemberDocument from "./IProjectMemberDocument";

/**
 * Project document
 * @author tung.nguyenvan
 */
interface IProjectDocument extends IBaseDocument {
    name: string;

    status: ProjectStatus;

    member: IProjectMemberDocument[] | Mongoose.Types.ObjectId[];
}

export default IProjectDocument