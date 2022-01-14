import BaseController from "framework/core/BaseController";
import IUserDocument from "../document/IUserDocument";
import UserRepository from "../repository/UserRepository";

class UserController extends BaseController<IUserDocument, UserRepository> {
    constructor() {
        super(new UserRepository());
    }
}

export default UserController;