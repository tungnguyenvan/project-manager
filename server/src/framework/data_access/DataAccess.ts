import Mongoose from "mongoose";
import Constant from "../consts/Constant";
import Logger from "../system/Logger";

const NAME_SPACE = "DataAccess";

class DataAccess {
    private static _instance: DataAccess;
    private _mongooseInstance: any;
    private _mongooseConnection: Mongoose.Connection;

    public connect(): void {
        try {
            Logger.debug(NAME_SPACE, `${NAME_SPACE}#connect start`);
            Mongoose.set("autoIndex", true);

            this._mongooseConnection = Mongoose.connection;
            this._mongooseConnection.once("open", () => {
                Logger.success(NAME_SPACE, `Connected to mongodb`);
            });

            this._mongooseInstance = Mongoose.connect(Constant.DB_URL);
        } catch (error: any) {
            Logger.error(NAME_SPACE, `${NAME_SPACE}#connect`, error);
        } finally {
            Logger.debug(NAME_SPACE, `${NAME_SPACE}#connect END`);
        }
    }

    public get mongooseConnection(): Mongoose.Connection {
        return this._mongooseConnection;
    }

    public get mongooseInstance(): any {
        return this._mongooseInstance;
    }

    public static get instance(): DataAccess {
        if (!this._instance) {
            this._instance = new DataAccess();
        }

        return this._instance;
    }
}

export default DataAccess;