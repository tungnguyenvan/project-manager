import Logger from "./system/Logger";
import Express from "express";
import ApiMiddleware from "./system/ApiMiddleware";
import DataAccess from "./data_access/DataAccess";
import bodyParser from "body-parser";
import UserRouter from "./api/router/UserRouter";
import FileRouter from "./api/router/FileRouter";

const NAME_SPACE = 'FrameworkApplication'

class FrameworkApplication {
    private static _instance: FrameworkApplication = undefined;
    private _apiApplication: any;

    public static get instance(): FrameworkApplication {
        if (this._instance === undefined) {
            this._instance = new FrameworkApplication();
            this.instance.initialize();
        }
        return this._instance;
    }

    private initialize(): void {
        try {
            Logger.debug(NAME_SPACE, `${NAME_SPACE}#initialize start`);

            // init express instance
            this._apiApplication = Express();
            // limit request
            this.apiApplication.use(ApiMiddleware.rateLimit);

            // initialize CORS
            this.apiApplication.use(ApiMiddleware.cors);

            // connect to database
            DataAccess.instance.connect();

            // use body parser
            this.apiApplication.use(bodyParser.urlencoded({ extended: true }));
            this.apiApplication.use(bodyParser.json());

            this.apiApplication.use('/user', new UserRouter().router);
            this.apiApplication.use('/file', new FileRouter().router);
        } catch (error: any) {
            Logger.error(NAME_SPACE, `${NAME_SPACE}#initialize`, error);
        } finally {
            Logger.debug(NAME_SPACE, `${NAME_SPACE}#initialize end`);
        }
    }

    public get apiApplication(): any {
        return this._apiApplication;
    }
}

export default FrameworkApplication;