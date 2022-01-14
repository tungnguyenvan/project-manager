import http from "http";
import Application from "./app/Application";
import Constant from "./framework/consts/Constant";
import Logger from "./framework/system/Logger";

const NAME_SPACE = 'index';

http.createServer(Application).listen(Constant.PORT, () => {
    Logger.success(NAME_SPACE, `Server started with port: ${Constant.PORT}`);
});