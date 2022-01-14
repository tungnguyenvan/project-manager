import Mongoose from "mongoose";
import jsonwebtoken from "jsonwebtoken";
import Constant from "../consts/Constant";
import Bcrypt from 'bcrypt'
import moment from "moment";

class AppUtil {
    static currentDateTime(format?: DateFormat) {
        return moment(new Date()).format(format || DateFormat.DD_MM_YYYY_HH_mm_SS);
    }

    static objectializeQueryParams(query: any): any {
        const object: any = {};
        for (const props in query) {
            if (props === "page" || props === "limit") {
                continue;
            }

            if (this.isJsonString(query[props])) {
                object[props] = JSON.parse(query[props]);
            }
        }

        return object;
    }

    static isJsonString(str: any): boolean {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }

        return true;
    }

    static isObjectId(id: any): boolean {
        return Mongoose.Types.ObjectId.isValid(id);
    }

    static hashBcrypt(str: string): Promise<string> {
        return new Promise((resolve, reject) => {
            Bcrypt.genSalt(Number(Constant.SALT_ROUNDS), (genSaltError, salt) => {
                if (genSaltError) {
                    reject(genSaltError);
                } else {
                    Bcrypt.hash(str, salt, (error, hash) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(hash);
                        }
                    });
                }
            });
        });
    }

    static splitToken(token: string) {
        return token.split(Constant.JWT_SPLIT_CHAR);
    }

    static bcryptCompare(firstPassword: string, secondPassword: string): Promise<boolean> {
        return Bcrypt.compare(firstPassword, secondPassword);
    }

    static generateJsonwebtoken(information: any): string {
        return jsonwebtoken.sign(information, Constant.JSON_WEB_TOKEN_KEY, {
            expiresIn: Constant.JSON_WEB_TOKEN_EXPIRESIN,
        });
    }
}

export default AppUtil;