import MessageId from "framework/consts/MessageId";
import RequestField from "framework/consts/RequestField";
import RuleType from "framework/consts/RuleType";

class Rule {
    private _field: RequestField;
    private _ruleType: RuleType;
    private _message: MessageId;
    private _ruleValue: number | string | RegExp | undefined;

    constructor(
        field: RequestField,
        type: RuleType,
        message: MessageId,
        value?: number | string | RegExp
    ) {
        this._field = field;
        this._ruleType = type;
        this._message = message;
        this._ruleValue = value;
    }

    get ruleType(): RuleType {
        return this._ruleType;
    }

    get errorMessage(): MessageId {
        return this._message;
    }

    get ruleValue(): number | string | RegExp | undefined {
        return this._ruleValue;
    }

    get field(): RequestField {
        return this._field;
    }
}

export default Rule;