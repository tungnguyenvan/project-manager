import Express from "express";
import MessageId from "framework/consts/MessageId";
import RequestErrorType from "framework/consts/RequestErrorType";
import RequestField from "framework/consts/RequestField";
import RuleType from "framework/consts/RuleType";
import IRouterValidateDocument from "framework/core/document/IBaseRouterValidate";
import IRequestError from "framework/core/document/IRequestError";
import Rule from "framework/core/document/Rule";
import ApiResponse from "framework/system/ApiResponse";
import Logger from "framework/system/Logger";

const NAME_SPACE = "RouterValidate"

class RouterValidate {
    private _baseRouterValidate: IRouterValidateDocument;
    private _requestFiled: RequestField;

    constructor(
        baseRouterValidate: IRouterValidateDocument,
        requestField: RequestField
    ) {
        this._baseRouterValidate = baseRouterValidate;
        this._requestFiled = requestField;

        this.max = this.max.bind(this);
        this.min = this.min.bind(this);
        this.regexp = this.regexp.bind(this);
        this.validate = this.validate.bind(this);
        this.required = this.required.bind(this);
        this.moreThan = this.moreThan.bind(this);
        this.lessThan = this.lessThan.bind(this);
    }

    validate(
        request: Express.Request,
        response: Express.Response,
        next: Express.NextFunction
    ): Express.Response {
        try {
            Logger.debug(NAME_SPACE, `${NAME_SPACE}#validate start`);
            const validateObject = (request as any)[this._requestFiled];

            if (!validateObject) {
                ApiResponse.badRequest(request, response, {
                    error_type: RequestErrorType.ROUTER_VALIDATE,
                    error_message_id: MessageId.VALIDATE_OBJECT_NOT_FOUND,
                    error_field: this._requestFiled,
                });
            }

            Logger.debug(NAME_SPACE, `Start validate object`, validateObject);
            for (const rule of this._baseRouterValidate.rules) {
                const errorResponse: IRequestError = {
                    error_type: RequestErrorType.ROUTER_VALIDATE,
                    error_message_id: rule.errorMessage,
                    error_field: rule.field,
                };

                switch (rule.ruleType) {
                    case RuleType.REQUIRED: {
                        if (!this.required(request, response, rule, validateObject)) {
                            return ApiResponse.badRequest(request, response, errorResponse);
                        }
                        break;
                    }
                    case RuleType.MAX: {
                        if (!this.max(request, response, rule, validateObject)) {
                            return ApiResponse.badRequest(request, response, errorResponse);
                        }
                        break;
                    }
                    case RuleType.MIN: {
                        if (!this.min(request, response, rule, validateObject)) {
                            return ApiResponse.badRequest(request, response, errorResponse);
                        }
                        break;
                    }
                    case RuleType.REGEXP: {
                        if (!this.regexp(request, response, rule, validateObject)) {
                            return ApiResponse.badRequest(request, response, errorResponse);
                        }
                        break;
                    }
                    case RuleType.MORE_THAN: {
                        if (!this.moreThan(request, response, rule, validateObject)) {
                            return ApiResponse.badRequest(request, response, errorResponse);
                        }
                        break;
                    }
                    case RuleType.LESS_THAN: {
                        if (!this.lessThan(request, response, rule, validateObject)) {
                            return ApiResponse.badRequest(request, response, errorResponse);
                        }
                        break;
                    }
                }
            }

            next();
            return response;
        } catch (error: any) {
            Logger.error(NAME_SPACE, `${NAME_SPACE}#validate`, error);
            ApiResponse.internalServerError(request, response);
        } finally {
            Logger.debug(NAME_SPACE, `${NAME_SPACE}#validate end`);
        }
    }

    private required(
        request: Express.Request,
        response: Express.Response,
        rule: Rule,
        validateObject: any
    ): boolean {
        try {
            Logger.debug(NAME_SPACE, `${NAME_SPACE}#required start`, rule);

            return validateObject[rule.field] !== null && validateObject[rule.field] !== undefined;
        } catch (error: any) {
            Logger.error(NAME_SPACE, `${NAME_SPACE}#required`, error);
            ApiResponse.internalServerError(request, response);
            return false;
        } finally {
            Logger.debug(NAME_SPACE, `${NAME_SPACE}#required end`, rule);
        }
    }

    private max(
        request: Express.Request,
        response: Express.Response,
        rule: Rule,
        validateObject: any
    ): boolean {
        try {
            Logger.debug(NAME_SPACE, `${NAME_SPACE}#max start`, rule);
            if (validateObject[rule.field]) {
                return validateObject[rule.field].length <= rule.ruleValue;
            }
            return true;
        } catch (error: any) {
            Logger.error(NAME_SPACE, `${NAME_SPACE}#max`, error);
            ApiResponse.internalServerError(request, response);
            return false;
        } finally {
            Logger.debug(NAME_SPACE, `${NAME_SPACE}#max end`, rule);
        }
    }

    private min(
        request: Express.Request,
        response: Express.Response,
        rule: Rule,
        validateObject: any
    ): boolean {
        try {
            Logger.debug(NAME_SPACE, `${NAME_SPACE}#min start`, rule);
            if (validateObject[rule.field]) {
                return validateObject[rule.field].length >= rule.ruleValue;
            }
            return true;
        } catch (error: any) {
            Logger.error(NAME_SPACE, `${NAME_SPACE}#min`, error);
            ApiResponse.internalServerError(request, response);
            return false;
        } finally {
            Logger.debug(NAME_SPACE, `${NAME_SPACE}#min end`, rule);
        }
    }

    private regexp(
        request: Express.Request,
        response: Express.Response,
        rule: Rule,
        validateObject: any
    ): boolean {
        try {
            Logger.debug(NAME_SPACE, `${NAME_SPACE}#regexp start`, rule);
            if (validateObject[rule.field]) {
                return (rule.ruleValue as RegExp).test(validateObject[rule.field]);
            }
            return true;
        } catch (error: any) {
            Logger.error(NAME_SPACE, `${NAME_SPACE}#regexp`, error);
            ApiResponse.internalServerError(request, response);
            return false;
        } finally {
            Logger.debug(NAME_SPACE, `${NAME_SPACE}#regexp end`, rule);
        }
    }

    private moreThan(
        request: Express.Request,
        response: Express.Response,
        rule: Rule,
        validateObject: any
    ) {
        try {
            Logger.debug(NAME_SPACE, `${NAME_SPACE}#moreThan start`, rule);
            if (validateObject[rule.field]) {
                return validateObject[rule.field] >= rule.ruleValue;
            }
            return true;
        } catch (error: any) {
            Logger.error(NAME_SPACE, `${NAME_SPACE}#moreThan`, error);
            ApiResponse.internalServerError(request, response);
        } finally {
            Logger.debug(NAME_SPACE, `${NAME_SPACE}#moreThan end`, rule);
        }
    }

    private lessThan(
        request: Express.Request,
        response: Express.Response,
        rule: Rule,
        validateObject: any
    ) {
        try {
            Logger.debug(NAME_SPACE, `${NAME_SPACE}#lessThan start`, rule);
            return validateObject[rule.field] && validateObject[rule.field] <= rule.ruleValue;
        } catch (error: any) {
            Logger.error(NAME_SPACE, `${NAME_SPACE}#lessThan`, error);
            ApiResponse.internalServerError(request, response);
        } finally {
            Logger.debug(NAME_SPACE, `${NAME_SPACE}#lessThan end`, rule);
        }
    }
}

export default RouterValidate;
