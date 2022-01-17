import BaseModel from "framework/core/BaseModel";
import Logger from "framework/system/Logger";
import IUserDocument from "../document/IUserDocument";
import UserSchema from "../schema/UserSchema";

const NAME_SPACE = 'UserModel';

/**
 * User model
 * @author tung.nguyenvan
 */
class UserModel extends BaseModel<IUserDocument> {
    constructor() {
        super(UserSchema);

        this.select = this.select.bind(this);
        this.byEmail = this.byEmail.bind(this);
    }

    select(): string {
        return '-__v';
    }

    byEmail(email: string): Promise<IUserDocument[]> {
        try {
            Logger.debug(NAME_SPACE, `${NAME_SPACE}#byEmail start`);
            return this._schema.find({
                email
            }).exec();
        } finally {
            Logger.debug(NAME_SPACE, `${NAME_SPACE}#byEmail end`);
        }
    }
}

export default UserModel;