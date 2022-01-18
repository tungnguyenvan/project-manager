import BaseRepository from "framework/core/BaseRepository";
import IProjectDocument from "../document/IProjectDocument";
import ProjectModel from "../model/ProjectModel";

/**
 * Project Repository
 * @author tung.nguyenvan
 */
class ProjectRepository extends BaseRepository<IProjectDocument, ProjectModel> {
	constructor() {
		super(new ProjectModel());
	}
}

export default ProjectRepository;