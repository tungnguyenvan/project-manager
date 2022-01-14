import BaseRepository from "framework/core/BaseRepository";
import IUserDocument from "../document/IUserDocument";
import UserModel from "../model/UserModel";

class UserRepository extends BaseRepository<IUserDocument, UserModel> {
    constructor() {
        super(new UserModel());
    }
}

export default UserRepository;