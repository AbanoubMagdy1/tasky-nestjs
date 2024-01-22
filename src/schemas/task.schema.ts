import { Document, PopulatedDoc, Schema, model } from "mongoose";
import { UserI } from "./user.schema";
import { CategoryI } from "./category.schema";

export interface TaskI extends Document {
    description: string;
    completed: boolean;
    user: PopulatedDoc<UserI>;
    category: PopulatedDoc<CategoryI>;
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
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }
});

TaskSchema.index({ 'user': 1 });
const Task = model<TaskI>('Task', TaskSchema);

export default Task;