import RequestField from "framework/consts/RequestField";
import BaseRouter from "framework/core/BaseRouter";
import ApiMiddleware from "framework/system/ApiMiddleware";
import RouterValidate from "framework/util/RouterValidate";
import FileController from "../controller/FileController";
import IFileDocument from "../document/IFileDocument";
import FileRouterMiddleware from "../middleware/FileRouterMiddleware";

class FileRouter extends BaseRouter<IFileDocument, FileController> {
    constructor() {
        super(new FileController());
    }

    initializeMiddleware(): void {
        const fileRouterMiddleware: FileRouterMiddleware = new FileRouterMiddleware();
        this._middleware = {
            save: [
                // ApiMiddleware.auth,
                fileRouterMiddleware.multer.single(RequestField.FILE),
                fileRouterMiddleware.single,
            ]
        }
    }
}

export default FileRouter;