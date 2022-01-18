import ProjectStatus from "app/consts/ProjectStatus";
import UserRole from "framework/consts/UserRole";
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

	member: [{
		role: {
			type: String,
			enum: UserRole,
			default: UserRole.DEVELOPER
		},
		user: {
			type: Mongoose.Types.ObjectId,
			ref: 'users',
		},
		by: {
			type: Mongoose.Types.ObjectId,
			ref: 'users'
		}
	}]
}

/**
 * Project Schema
 * @author tung.nguyenvan
 */
const ProjectSchema = BaseSchema.initializeDocument<IProjectDocument>("Project", document);
export default ProjectSchema;