import BaseModel from "framework/core/BaseModel";
import AppUtil from "framework/util/AppUtil";
import IProjectDocument from "../document/IProjectDocument";
import ProjectSchema from "../schema/ProjectSchema";
import ProjectMemberModel from "./ProjectMemberModel";

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

	populate(): any {
		return [
			...AppUtil.basePopulate,
			{
				path: 'member',
				select: '-__v',
				populate: ProjectMemberModel.populate()
			}
		]
	}
}

export default ProjectModel;