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
        this.loginByEmail = this.loginByEmail.bind(this);
        this.loginValidPassword = this.loginValidPassword.bind(this);
        this.loginGenerateToken = this.loginGenerateToken.bind(this);
        this.loginSuccess = this.loginSuccess.bind(this);
        this.removeFields = this.removeFields.bind(this);
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

    loginByEmail(request: Express.Request, response: Express.Response, next: Express.NextFunction): void {
        try {
            Logger.debug(NAME_SPACE, `${NAME_SPACE}#loginByEmail start`);
            this._repository.byEmail(request)
                .then(responseData => {
                    if (!responseData.length) {
                        return ApiResponse.badRequest(request, response, {
                            error_type: RequestErrorType.LOGIN_FAILED,
                            error_field: RequestField.EMAIL,
                            error_message_id: MessageId.EMAIL_NOT_FOUND,
                        });
                    }

                    (request as any).login_by_email = responseData[0];
                    next();
                }).catch(error => {
                    Logger.error(NAME_SPACE, `${NAME_SPACE}#loginByEmail`, error);
                    this.catchError(request, response, error);
                })
        } catch (error) {
            Logger.error(NAME_SPACE, `${NAME_SPACE}#loginByEmail`, error);
            this.catchError(request, response, error);
        } finally {
            Logger.debug(NAME_SPACE, `${NAME_SPACE}#loginByEmail end`);
        }
    }

    loginValidPassword(request: Express.Request, response: Express.Response, next: Express.NextFunction): void {
        try {
            Logger.debug(NAME_SPACE, `${NAME_SPACE}#loginValidPassword start`);
            AppUtil.bcryptCompare(request.body.password, (request as any).login_by_email.password)
                .then(result => {
                    if (!result) {
                        return ApiResponse.badRequest(request, response, {
                            error_field: RequestField.PASSWORD,
                            error_type: RequestErrorType.LOGIN_FAILED,
                            error_message_id: MessageId.PASSWORD_NOT_MATCH,
                        });
                    }
                    next();
                })
        } catch (error) {
            Logger.error(NAME_SPACE, `${NAME_SPACE}#loginValidPassword`, error);
            this.catchError(request, response, error);
        } finally {
            Logger.debug(NAME_SPACE, `${NAME_SPACE}#loginValidPassword end`);
        }
    }

    loginGenerateToken(request: Express.Request, response: Express.Response, next: Express.NextFunction): void {
        try {
            Logger.debug(NAME_SPACE, `${NAME_SPACE}#loginGenerateToken start`);
            (request as any).login_by_email.token = AppUtil.generateJsonwebtoken({
                _id: (request as any).login_by_email._id,
                email: (request as any).login_by_email.email,
                status: (request as any).login_by_email.status,
                role: (request as any).login_by_email.role,
            });

            this._repository.updateToken(request)
                .then(updateData => {
                    if ((updateData as any).modifiedCount > 0) {
                        next();
                    } else {
                        Logger.error(NAME_SPACE, `${NAME_SPACE}#loginGenerateToken cannot update token`, updateData);
                        ApiResponse.internalServerError(request, response);
                    }
                }).catch(error => {
                    Logger.error(NAME_SPACE, `${NAME_SPACE}#loginGenerateToken`, error);
                    this.catchError(request, response, error);
                });
        } catch (error) {
            Logger.error(NAME_SPACE, `${NAME_SPACE}#loginGenerateToken`, error);
            this.catchError(request, response, error);
        } finally {
            Logger.debug(NAME_SPACE, `${NAME_SPACE}#loginGenerateToken end`);
        }
    }

    loginSuccess(request: Express.Request, response: Express.Response, next: Express.NextFunction): void {
        try {
            Logger.debug(NAME_SPACE, `${NAME_SPACE}#loginSuccess start`);
            request.params.id = (request as any).login_by_email._id;
            this.get(request, response);
        } catch (error) {
            Logger.error(NAME_SPACE, `${NAME_SPACE}#loginSuccess`, error);
            this.catchError(request, response, error);
        } finally {
            Logger.debug(NAME_SPACE, `${NAME_SPACE}#loginSuccess end`);
        }
    }

    removeFields(request: Express.Request, response: Express.Response, next: Express.NextFunction): void {
        try {
            Logger.debug(NAME_SPACE, `${NAME_SPACE}#removeFields start`);
            delete request.body.role;
            delete request.body.status;
            delete request.body.token;
            delete request.body.avatar;

            next();
        } catch (error) {
            Logger.error(NAME_SPACE, `${NAME_SPACE}#removeFields`, error);
            this.catchError(request, response, error);
        } finally {
            Logger.debug(NAME_SPACE, `${NAME_SPACE}#removeFields end`);
        }
    }
}

export default UserController;