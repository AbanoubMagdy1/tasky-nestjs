import { Schema, model } from "mongoose";

export const TaskSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

const Task = model('Task', TaskSchema);

export default Task;