import { Document, PopulatedDoc, Schema, model } from "mongoose";
import { UserI } from "./user.schema";

export interface TaskI extends Document {
    description: string;
    completed: boolean;
    user: PopulatedDoc<UserI>;
}

export const TaskSchema = new Schema<TaskI>({
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

TaskSchema.index({ 'user': 1 });
const Task = model<TaskI>('Task', TaskSchema);

export default Task;