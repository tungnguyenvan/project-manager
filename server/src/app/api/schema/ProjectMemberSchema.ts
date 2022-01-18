import UserRole from "framework/consts/UserRole";
import BaseSchema from "framework/data_access/schema/BaseSchema";
import Mongoose from "mongoose";
import IProjectMemberDocument from "../document/IProjectMemberDocument";

const document = {
	...BaseSchema.schema,
	user: {
		type: Mongoose.Types.ObjectId,
		ref: 'users'
	},

	role: {
		type: String,
		enum: UserRole,
		default: UserRole.DEVELOPER
	}
}

/**
 * ProjectMember Schema
 * @author tung.nguyenvan
 */
const ProjectMemberSchema = BaseSchema.initializeDocument<IProjectMemberDocument>("ProjectMember", document);
export default ProjectMemberSchema;