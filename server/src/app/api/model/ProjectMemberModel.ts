import BaseModel from "framework/core/BaseModel";
import AppUtil from "framework/util/AppUtil";
import IProjectMemberDocument from "../document/IProjectMemberDocument";
import ProjectMemberSchema from "../schema/ProjectMemberSchema";

/**
 * ProjectMember model
 * @author tung.nguyenvan
 */
class ProjectMemberModel extends BaseModel<IProjectMemberDocument> {
	constructor() {
		super(ProjectMemberSchema);
	}

	select(): string {
		return '-__v';
	}

	static populate(): { path: string; select: string; }[] {
		return [
			...AppUtil.basePopulate,
			{
				path: 'user',
				select: '-__v -password -token'
			}
		]
	}

	populate(): { path: string; select: string; }[] {
		return ProjectMemberModel.populate();
	}
}

export default ProjectMemberModel;