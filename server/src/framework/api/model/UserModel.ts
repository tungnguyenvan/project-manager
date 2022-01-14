import BaseModel from "framework/core/BaseModel";
import IUserDocument from "../document/IUserDocument";
import UserSchema from "../schema/UserSchema";

/**
 * User model
 * @author tung.nguyenvan
 */
class UserModel extends BaseModel<IUserDocument> {
    constructor() {
        super(UserSchema);
    }

    select(): string {
        return '-__v';
    }
}

export default UserModel;