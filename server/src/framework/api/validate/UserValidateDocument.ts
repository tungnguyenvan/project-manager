import MessageId from "framework/consts/MessageId";
import RequestField from "framework/consts/RequestField";
import RuleType from "framework/consts/RuleType";
import IRouterValidateDocument from "framework/core/document/IBaseRouterValidate";
import Rule from "framework/core/document/Rule";

class UserValidateDocument {
    static all: IRouterValidateDocument = {
        rules: []
    }

    static save: IRouterValidateDocument = {
        rules: [
            new Rule(
                RequestField.NAME,
                RuleType.REQUIRED,
                MessageId.VALIDATE_NAME_REQUIRED
            ),
            new Rule(
                RequestField.EMAIL,
                RuleType.REQUIRED,
                MessageId.VALIDATE_EMAIL_REQUIRED
            ),
            new Rule(
                RequestField.EMAIL,
                RuleType.REGEXP,
                MessageId.VALIDATE_EMAIL_NOT_MATCH_FORMAT,
                new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
            ),
            new Rule(
                RequestField.PASSWORD,
                RuleType.REQUIRED,
                MessageId.VALIDATE_PASSWORD_REQUIRED
            ),
            new Rule(
                RequestField.PASSWORD,
                RuleType.MIN,
                MessageId.VALIDATE_PASSWORD_MIN,
                6
            ),
            new Rule(
                RequestField.PASSWORD,
                RuleType.MAX,
                MessageId.VALIDATE_PASSWORD_MAX,
                50
            )
        ]
    };

    static get: IRouterValidateDocument = {
        rules: []
    };

    static update: IRouterValidateDocument = {
        rules: [
            new Rule(
                RequestField.EMAIL,
                RuleType.REGEXP,
                MessageId.VALIDATE_EMAIL_NOT_MATCH_FORMAT,
                new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
            ),
            new Rule(
                RequestField.PASSWORD,
                RuleType.MIN,
                MessageId.VALIDATE_PASSWORD_MIN,
                6
            ),
            new Rule(
                RequestField.PASSWORD,
                RuleType.MAX,
                MessageId.VALIDATE_PASSWORD_MAX,
                50
            )
        ]
    };

    static delete: IRouterValidateDocument = {
        rules: []
    };

    static login: IRouterValidateDocument = {
        rules: [
            new Rule(
                RequestField.EMAIL,
                RuleType.REQUIRED,
                MessageId.VALIDATE_EMAIL_REQUIRED,
            ),
            new Rule(
                RequestField.PASSWORD,
                RuleType.REQUIRED,
                MessageId.VALIDATE_PASSWORD_REQUIRED
            )
        ]
    }
}

export default UserValidateDocument