import IRouterValidateDocument from "./document/IBaseRouterValidate";
import Rule from "./document/Rule";
import RequestField from "framework/consts/RequestField";
import RuleType from "framework/consts/RuleType";
import MessageId from "framework/consts/MessageId";

class DefaultRouterValidate {
    static all: IRouterValidateDocument = {
        rules: [
            new Rule(
                RequestField.LIMIT,
                RuleType.MORE_THAN,
                MessageId.VALIDATE_LIMIT_MORE_THAN_1,
                1
            ),
            new Rule(
                RequestField.PAGE,
                RuleType.MORE_THAN,
                MessageId.VALIDATE_PAGE_MORE_THAN_1,
                1
            ),
        ],
    };

    static update: IRouterValidateDocument = {
        rules: [
            new Rule(
                RequestField.ID,
                RuleType.REQUIRED,
                MessageId.VALIDATE_ID_REQUIRED
            ),
            new Rule(
                RequestField.ID,
                RuleType.MIN,
                MessageId.VALIDATE_ID_MIN_24,
                24
            ),
            new Rule(
                RequestField.ID,
                RuleType.MAX,
                MessageId.VALIDATE_ID_MAX_24,
                24
            ),
            new Rule(
                RequestField.ID,
                RuleType.REGEXP,
                MessageId.VALIDATE_ID_NOT_MATCH_WITH_FORMAT,
                new RegExp(/^[0-9a-fA-F]{24}$/)
            ),
        ],
    };

    static get: IRouterValidateDocument = {
        rules: [
            new Rule(
                RequestField.ID,
                RuleType.REQUIRED,
                MessageId.VALIDATE_ID_REQUIRED
            ),
            new Rule(
                RequestField.ID,
                RuleType.MIN,
                MessageId.VALIDATE_ID_MIN_24,
                24
            ),
            new Rule(
                RequestField.ID,
                RuleType.MAX,
                MessageId.VALIDATE_ID_MAX_24,
                24
            ),
            new Rule(
                RequestField.ID,
                RuleType.REGEXP,
                MessageId.VALIDATE_ID_NOT_MATCH_WITH_FORMAT,
                new RegExp(/^[0-9a-fA-F]{24}$/)
            ),
        ]
    };

    static delete: IRouterValidateDocument = {
        rules: [
            new Rule(
                RequestField.ID,
                RuleType.REQUIRED,
                MessageId.VALIDATE_ID_REQUIRED
            ),
            new Rule(
                RequestField.ID,
                RuleType.MIN,
                MessageId.VALIDATE_ID_MIN_24,
                24
            ),
            new Rule(
                RequestField.ID,
                RuleType.MAX,
                MessageId.VALIDATE_ID_MAX_24,
                24
            ),
            new Rule(
                RequestField.ID,
                RuleType.REGEXP,
                MessageId.VALIDATE_ID_NOT_MATCH_WITH_FORMAT,
                new RegExp(/^[0-9a-fA-F]{24}$/)
            ),
        ],
    };
}

export default DefaultRouterValidate;