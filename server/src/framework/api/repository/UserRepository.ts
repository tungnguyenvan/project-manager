import BaseRepository from "framework/core/BaseRepository";
import IUserDocument from "../document/IUserDocument";
import UserModel from "../model/UserModel";

/**
 * User Repository
 * @author tung.nguyenvan
 */
class UserRepository extends BaseRepository<IUserDocument, UserModel> {
    constructor() {
        super(new UserModel());
    }
}

export default UserRepository;