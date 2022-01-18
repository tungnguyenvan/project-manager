import IUserDocument from "framework/api/document/IUserDocument";
import UserRole from "framework/consts/UserRole";
import IBaseDocument from "framework/core/document/IBaseDocument";
import Mongoose from "mongoose";

/**
 * ProjectMember document
 * @author tung.nguyenvan
 */
interface IProjectMemberDocument extends IBaseDocument {
    user: IUserDocument | Mongoose.Types.ObjectId,
    role: UserRole
}

export default IProjectMemberDocument