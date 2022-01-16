import Express from 'express';
import BaseRepository from "framework/core/BaseRepository";
import Logger from "framework/system/Logger";
import IUserDocument from "../document/IUserDocument";
import UserModel from "../model/UserModel";

const NAME_SPACE = 'UserRepository';

/**
 * User Repository
 * @author tung.nguyenvan
 */
class UserRepository extends BaseRepository<IUserDocument, UserModel> {
    constructor() {
        super(new UserModel());

        this.byEmail = this.byEmail.bind(this);
    }

    byEmail(request: Express.Request): Promise<IUserDocument[]> {
        try {
            Logger.debug(NAME_SPACE, `${NAME_SPACE}#byEmail start`);
            return this._model.byEmail(request.body.email);
        } finally {
            Logger.debug(NAME_SPACE, `${NAME_SPACE}#byEmail end`);
        }
    }
}

export default UserRepository;