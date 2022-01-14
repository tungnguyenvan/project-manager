import BaseRouter from "framework/core/BaseRouter";
import UserController from "../controller/UserController";
import IUserDocument from "../document/IUserDocument";

/**
 * User Router
 * @author tung.nguyenvan
 */
class UserRouter extends BaseRouter<IUserDocument, UserController> {
    constructor() {
        super(new UserController());
    }
}

export default UserRouter;