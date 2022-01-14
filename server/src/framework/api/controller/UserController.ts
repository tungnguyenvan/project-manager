import BaseController from "framework/core/BaseController";
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
    }
}

export default UserController;