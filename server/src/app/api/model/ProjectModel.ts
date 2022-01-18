import BaseModel from "framework/core/BaseModel";
import AppUtil from "framework/util/AppUtil";
import IProjectDocument from "../document/IProjectDocument";
import ProjectSchema from "../schema/ProjectSchema";

/**
 * Project model
 * @author tung.nguyenvan
 */
class ProjectModel extends BaseModel<IProjectDocument> {
	constructor() {
		super(ProjectSchema);
	}

	select(): string {
		return '-__v';
	}

	populate(): { path: string; select: string; }[] {
		return [
			...AppUtil.basePopulate,
		]
	}
}

export default ProjectModel;