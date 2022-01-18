import ProjectStatus from "app/consts/ProjectStatus";
import BaseSchema from "framework/data_access/schema/BaseSchema";
import Mongoose from "mongoose";
import IProjectDocument from "../document/IProjectDocument";

const document = {
	...BaseSchema.schema,
	name: String,

	status: {
		type: String,
		enum: ProjectStatus,
		default: ProjectStatus.DOING
	},

	member: {
		type: [Mongoose.Types.ObjectId],
		ref: 'ProjectMember'
	}
}

/**
 * Project Schema
 * @author tung.nguyenvan
 */
const ProjectSchema = BaseSchema.initializeDocument<IProjectDocument>("Project", document);
export default ProjectSchema;