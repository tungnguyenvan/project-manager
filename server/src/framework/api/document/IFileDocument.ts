import IBaseDocument from "framework/core/document/IBaseDocument";

interface IFileDocument extends IBaseDocument {
    url: string;
}

export default IFileDocument;