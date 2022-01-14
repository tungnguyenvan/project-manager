import IBaseDocument from "../document/IBaseDocument";

interface IBaseRepository<T extends IBaseDocument> {
    all(request: Express.Request): Promise<T[]>;
    count(): Promise<number>;
    save(request: Express.Request): Promise<T>;
    get(request: Express.Request): Promise<T>;
    update(request: Express.Request): Promise<T>;
    delete(request: Express.Request): Promise<T>;
}

export default IBaseRepository;