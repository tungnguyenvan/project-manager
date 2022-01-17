import Express from 'express';
import BaseRepository from "framework/core/BaseRepository";
import IFileDocument from '../document/IFileDocument';
import FileModel from '../model/FileModel';

const NAME_SPACE = 'FileRepository';

/**
 * File Repository
 * @author tung.nguyenvan
 */
class FileRepository extends BaseRepository<IFileDocument, FileModel> {
    constructor() {
        super(new FileModel());
    }
}

export default FileRepository;