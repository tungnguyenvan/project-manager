import BaseController from "framework/core/BaseController";
import IProjectMemberDocument from "../document/IProjectMemberDocument";
import ProjectMemberRepository from "../repository/ProjectMemberRepository";

const NAME_SPACE = "UserController"

/**
 * ProjectMember Controller
 * @author tung.nguyenvan
 */
class ProjectMemberController extends BaseController<IProjectMemberDocument, ProjectMemberRepository> {
	constructor() {
		super(new ProjectMemberRepository());
	}
}

export default ProjectMemberController;