import BaseController from "framework/core/BaseController";
import IProjectDocument from "../document/IProjectDocument";
import ProjectRepository from "../repository/ProjectRepository";

const NAME_SPACE = "UserController"

/**
 * Project Controller
 * @author tung.nguyenvan
 */
class ProjectController extends BaseController<IProjectDocument, ProjectRepository> {
	constructor() {
		super(new ProjectRepository());
	}
}

export default ProjectController;