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
                this._controller.emailIsUnique,
                this._controller.hashPassword
            ]
        }
    }
}

export default UserRouter;