import IRouterValidateDocument from "framework/core/document/IBaseRouterValidate";

class UserValidateDocument {
    static all: IRouterValidateDocument = {
        rules: []
    }

    static save: IRouterValidateDocument = {
        rules: []
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

export default UserValidateDocument