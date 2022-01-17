import BaseController from "framework/core/BaseController";
import IFileDocument from "../document/IFileDocument";
import FileRepository from "../repository/FileRepository";

class FileController extends BaseController<IFileDocument, FileRepository> {
    constructor() {
        super(new FileRepository());
    }
}

export default FileController;