import Express from "express";
import MessageId from "framework/consts/MessageId";
import RequestErrorType from "framework/consts/RequestErrorType";
import RequestField from "framework/consts/RequestField";
import BaseController from "framework/core/BaseController";
import ApiResponse from "framework/system/ApiResponse";
import Logger from "framework/system/Logger";
import AppUtil from "framework/util/AppUtil";
import IUserDocument from "../document/IUserDocument";
import UserRepository from "../repository/UserRepository";

const NAME_SPACE = "UserController"

/**
 * User Controller
 * @author tung.nguyenvan
 */
class UserController extends BaseController<IUserDocument, UserRepository> {
    constructor() {
        super(new UserRepository());

        this.emailIsUnique = this.emailIsUnique.bind(this);
        this.hashPassword = this.hashPassword.bind(this);
    }

    /**
     * Check email is exist
     * @param request 
     * @param response 
     * @param next 
     */
    emailIsUnique(request: Express.Request, response: Express.Response, next: Express.NextFunction): void {
        try {
            Logger.debug(NAME_SPACE, `${NAME_SPACE}#emailIsUnique start`);
            this._repository.byEmail(request).then(dataResponse => {
                if (dataResponse.length) {
                    return ApiResponse.badRequest(request, response, {
                        error_type: RequestErrorType.DATA_IS_EXIST,
                        error_message_id: MessageId.EMAIL_IS_EXIST,
                        error_field: RequestField.EMAIL,
                    });
                }

                next();
            }).catch(error => {
                Logger.error(NAME_SPACE, `${NAME_SPACE}#emailIsUnique`, error);
                this.catchError(request, response, error);
            })
        } catch (error) {
            Logger.error(NAME_SPACE, `${NAME_SPACE}#emailIsUnique`, error);
            this.catchError(request, response, error);
        } finally {
            Logger.debug(NAME_SPACE, `${NAME_SPACE}#emailIsUnique end`);
        }
    }

    /**
     * hash password before save
     * @param request 
     * @param response 
     * @param next 
     */
    hashPassword(request: Express.Request, response: Express.Response, next: Express.NextFunction): void {
        try {
            Logger.debug(NAME_SPACE, `${NAME_SPACE}#hasPassword start`);
            AppUtil.hashBcrypt(request.body.password).then(password => {
                request.body.password = password;
                next();
            }).catch(error => {
                Logger.error(NAME_SPACE, `${NAME_SPACE}#hasPassword`, error);
                this.catchError(request, response, error);
            })
        } catch (error) {
            Logger.error(NAME_SPACE, `${NAME_SPACE}#hasPassword`, error);
            this.catchError(request, response, error);
        } finally {
            Logger.debug(NAME_SPACE, `${NAME_SPACE}#hasPassword end`);
        }
    }
}

export default UserController;