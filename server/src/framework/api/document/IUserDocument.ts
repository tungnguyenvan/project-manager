import UserRole from "framework/consts/UserRole";
import UserStatus from "framework/consts/UserStatus";
import IBaseDocument from "framework/core/document/IBaseDocument";
import IFileDocument from "./IFileDocument";

/**
 * User document
 * @author tung.nguyenvan
 */
interface IUserDocument extends IBaseDocument {
    name: string;

    email: string;

    password: string;

    status: UserStatus;

    role: UserRole;

    token: string;

    avatar: IFileDocument | string;
}

export default IUserDocument