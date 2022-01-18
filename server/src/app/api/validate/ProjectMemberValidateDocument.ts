import MessageId from "framework/consts/MessageId";
import RequestField from "framework/consts/RequestField";
import RuleType from "framework/consts/RuleType";
import IRouterValidateDocument from "framework/core/document/IBaseRouterValidate";
import Rule from "framework/core/document/Rule";

class ProjectMemberValidateDocument {
	static all: IRouterValidateDocument = {
		rules: []
	}

	static save: IRouterValidateDocument = {
		rules: [
			new Rule(
				RequestField.USER,
				RuleType.REQUIRED,
				MessageId.VALIDATE_USER_REQUIRED
			),
			new Rule(
				RequestField.ROLE,
				RuleType.REQUIRED,
				MessageId.VALIDATE_ROLE_REQUIRED
			)
		]
	}

	static get: IRouterValidateDocument = {
		rules: []
	}

	static update: IRouterValidateDocument = {
		rules: []
	}

	static delete: IRouterValidateDocument = {
		rules: []
	}
}

export default ProjectMemberValidateDocument