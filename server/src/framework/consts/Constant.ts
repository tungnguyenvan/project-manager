import env from "dotenv";
env.config();

/**
 * App Constants
 */
class Constant {
    public static DB_URL: string = process.env.DB_URL;
    public static PORT: number | string = process.env.PORT || 3002;
    public static MAX_REQUEST_PER_HOURS: number | string = process.env.MAX_REQUEST_PER_HOURS || 500;
    public static REQUEST_ALL_LIMIT: number =
        (process.env.REQUEST_ALL_LIMIT as unknown as number) || 50;
    public static DEFAULT_PAGE_INDEX: number = 1;
    public static FIREBASE_BUCKET_URL: string = process.env.BUCKET_URL;
    public static SALT_ROUNDS = process.env.SALT_ROUNDS;
    public static JWT_SPLIT_CHAR: string = " ";
    public static AUTH_TOKEN_PREFIX: string = process.env.AUTH_TOKEN_PREFIX;
    public static JSON_WEB_TOKEN_KEY: string = process.env.JSON_WEB_TOKEN_KEY;
    public static JSON_WEB_TOKEN_EXPIRESIN: string = process.env.JSON_WEB_TOKEN_EXPIRESIN;
}

export default Constant;