import RequestField from "framework/consts/RequestField";
import BaseRouter from "framework/core/BaseRouter";
import RouterValidate from "framework/util/RouterValidate";
import UserController from "../controller/UserController";
import IUserDocument from "../document/IUserDocument";
import UserValidateDocument from "../validate/UserValidateDocument";

/**
 * User Router
 * @author tung.nguyenvan
 */
class UserRouter extends BaseRouter<IUserDocument, UserController> {
    constructor() {
        super(new UserController());
    }

    initializeMiddleware(): void {
        this._middleware = {
            save: [
                new RouterValidate(
                    UserValidateDocument.save,
                    RequestField.BODY
                ).validate,
                this._controller.removeFields,
                this._controller.emailIsUnique,
                this._controller.hashPassword
            ]
        }
    }

    initalize(): void {
        super.initalize();

        this.router.post('/auth/login', [
            new RouterValidate(UserValidateDocument.login, RequestField.BODY).validate,
            this._controller.loginByEmail,
            this._controller.loginValidPassword,
            this._controller.loginGenerateToken
        ], this._controller.loginSuccess)
    }
}

export default UserRouter;