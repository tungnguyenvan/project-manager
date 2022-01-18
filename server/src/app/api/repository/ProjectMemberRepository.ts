import BaseRepository from "framework/core/BaseRepository";
import IProjectMemberDocument from "../document/IProjectMemberDocument";
import ProjectMemberModel from "../model/ProjectMemberModel";

/**
 * ProjectMember Repository
 * @author tung.nguyenvan
 */
class ProjectMemberRepository extends BaseRepository<IProjectMemberDocument, ProjectMemberModel> {
	constructor() {
		super(new ProjectMemberModel());
	}
}

export default ProjectMemberRepository;