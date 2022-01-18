import ProjectStatus from "app/consts/ProjectStatus";
import IUserDocument from "framework/api/document/IUserDocument";
import UserRole from "framework/consts/UserRole";
import IBaseDocument from "framework/core/document/IBaseDocument";
import Mongoose from "mongoose";

interface IProjectMemberDocument {
    role: UserRole,
    user: Mongoose.Types.ObjectId | IUserDocument,
    by: Mongoose.Types.ObjectId | IUserDocument
}

/**
 * Project document
 * @author tung.nguyenvan
 */
interface IProjectDocument extends IBaseDocument {
    name: string;

    status: ProjectStatus;

    member: IProjectDocument[];
}

export default IProjectDocument