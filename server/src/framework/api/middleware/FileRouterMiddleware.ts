import Mongoose from 'mongoose';
import Express from "express";
import Multer from "multer";
import { Bucket } from "@google-cloud/storage";
import * as FirebaseAdmin from "firebase-admin";
import * as ServiceAccount from "../../../resource/firebaseServiceAccount.json";
import Constant from "framework/consts/Constant";
import IFileDocument from "../document/IFileDocument";
import Logger from "framework/system/Logger";
import Path from 'path';
import ApiResponse from 'framework/system/ApiResponse';
import RequestField from 'framework/consts/RequestField';
import MessageId from 'framework/consts/MessageId';
import RequestErrorType from 'framework/consts/RequestErrorType';

const NAME_SPACE = 'FileRouterMiddleware';

class FileRouterMiddleware {
    private _firebaseApplication: FirebaseAdmin.app.App;
    private _storageBucket: Bucket;
    private _multerOption: Multer.Options;

    constructor() {
        this._initializeFirebaseAdmin = this._initializeFirebaseAdmin.bind(this);
        this._initializeMulter = this._initializeMulter.bind(this);
        this.single = this.single.bind(this);
        this.upload = this.upload.bind(this);

        this._initializeFirebaseAdmin();
        this._initializeMulter();
    }

    private _initializeFirebaseAdmin(): void {
        this._firebaseApplication = FirebaseAdmin.initializeApp({
            credential: FirebaseAdmin.credential.cert({
                projectId: ServiceAccount.project_id,
                clientEmail: ServiceAccount.client_email,
                privateKey: ServiceAccount.private_key,
            }),
        });
        this._storageBucket = this._firebaseApplication.storage().bucket(Constant.FIREBASE_BUCKET_URL);
    }

    private _initializeMulter(): void {
        this._multerOption = {
            storage: Multer.memoryStorage(),
            fileFilter: this._multerFilter,
            limits: {
                fileSize: 5 * 1024 * 1024, // 5Mb
            }
        }
    }

    get multer(): Multer.Multer {
        return Multer(this._multerOption)
    }

    private _multerFilter(request: Express.Request, file: globalThis.Express.Multer.File, callback: Multer.FileFilterCallback): void {
        if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
            callback(null, true);
        } else {
            callback(null, false);
        }
    }

    upload(file: globalThis.Express.Multer.File): Promise<IFileDocument> {
        return new Promise((resolve, reject) => {
            try {
                Logger.debug(NAME_SPACE, `${NAME_SPACE}#upload start`, file);

                const newFileName = `${new Mongoose.Types.ObjectId()}`;
                const fileUpload = this._storageBucket.file(newFileName);
                const acessToken = `${new Mongoose.Types.ObjectId()}`;
                const blobStream = fileUpload.createWriteStream({
                    metadata: {
                        encoding: file.encoding,
                        contentType: file.mimetype,
                        firebaseStorageDownloadTokens: acessToken,
                    },
                });

                blobStream.on('finish', () => {
                    const url = `https://firebasestorage.googleapis.com/v0/b/${this._storageBucket.name}/o/${newFileName}?alt=media`;
                    resolve({
                        url,
                    } as IFileDocument);
                });

                blobStream.on('error', (error) => {
                    Logger.error(NAME_SPACE, `${NAME_SPACE}#upload`, error);
                    reject(error);
                });

                blobStream.end(file.buffer);
            } catch (error) {
                Logger.error(NAME_SPACE, `${NAME_SPACE}#upload`, error);
            } finally {
                Logger.debug(NAME_SPACE, `${NAME_SPACE}#upload end`);
            }
        });
    }

    single(request: Express.Request, response: Express.Response, next: Express.NextFunction): void {
        try {
            Logger.debug(NAME_SPACE, `${NAME_SPACE}#single start`);
            const file = request.file;

            if (file) {
                this.upload(file)
                    .then(fileDocument => {
                        request.body = fileDocument;
                        Logger.success(NAME_SPACE, `${NAME_SPACE}single Upload file success`, fileDocument);
                        next();
                    }).catch(error => {
                        Logger.error(NAME_SPACE, `${NAME_SPACE}#single`, error);
                        ApiResponse.internalServerError(request, response);
                    });
            } else {
                ApiResponse.badRequest(request, response, {
                    error_field: RequestField.FILE,
                    error_message_id: MessageId.VALIDATE_FILE_REQUIRED,
                    error_type: RequestErrorType.ROUTER_VALIDATE,
                });
            }
        } catch (error) {
            Logger.error(NAME_SPACE, `${NAME_SPACE}#single`, error);
            ApiResponse.internalServerError(request, response);
        } finally {
            Logger.debug(NAME_SPACE, `${NAME_SPACE}#single end`);
        }
    }
}

export default FileRouterMiddleware;