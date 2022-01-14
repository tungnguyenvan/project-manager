import MessageId from "framework/consts/MessageId";
import RequestErrorType from "framework/consts/RequestErrorType";
import RequestField from "framework/consts/RequestField";

interface IRequestError {
    error_type: RequestErrorType;
    error_message_id: MessageId;
    error_field: RequestField;
}

export default IRequestError;