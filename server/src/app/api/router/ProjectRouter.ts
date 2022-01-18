import BaseRouter from "framework/core/BaseRouter";
import ApiMiddleware from "framework/system/ApiMiddleware";
import ProjectController from "../controller/ProjectController";
import IProjectDocument from "../document/IProjectDocument";

/**
 * Project Router
 * @author tung.nguyenvan
 */
class ProjectRouter extends BaseRouter<IProjectDocument, ProjectController> {
	constructor() {
		super(new ProjectController());
	}

	initializeMiddleware(): void {
		super.initializeMiddleware();
		this._middleware.save = [
			ApiMiddleware.auth,
		]
	}
}

export default ProjectRouter;