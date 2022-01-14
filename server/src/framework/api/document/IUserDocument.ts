import IBaseDocument from "framework/core/document/IBaseDocument";

/**
 * User document
 * @author tung.nguyenvan
 */
interface IUserDocument extends IBaseDocument {
    name: string;
}

export default IUserDocument