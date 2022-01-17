import Express from 'express';
import BaseRepository from "framework/core/BaseRepository";
import Logger from "framework/system/Logger";
import Mongoose from 'mongoose';
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

    updateToken(request: Express.Request): Promise<IUserDocument> {
        try {
            Logger.debug(NAME_SPACE, `${NAME_SPACE}#updateToken start`);
            return this._model.update(new Mongoose.Types.ObjectId((request as any).login_by_email._id), {
                token: (request as any).login_by_email.token
            } as IUserDocument);
        } finally {
            Logger.debug(NAME_SPACE, `${NAME_SPACE}#updateToken end`);
        }
    }
}

export default UserRepository;