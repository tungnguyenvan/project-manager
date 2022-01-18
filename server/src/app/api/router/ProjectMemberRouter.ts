import BaseRouter from "framework/core/BaseRouter";
import ApiMiddleware from "framework/system/ApiMiddleware";
import ProjectMemberController from "../controller/ProjectMemberController";
import IProjectMemberDocument from "../document/IProjectMemberDocument";

/**
 * ProjectMember Router
 * @author tung.nguyenvan
 */
class ProjectMemberRouter extends BaseRouter<IProjectMemberDocument, ProjectMemberController> {
	constructor() {
		super(new ProjectMemberController());
	}

	initializeMiddleware(): void {
		super.initializeMiddleware();
		this._middleware.save = [
			ApiMiddleware.auth
		]
	}
}

export default ProjectMemberRouter;