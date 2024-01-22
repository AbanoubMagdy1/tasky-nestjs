import { Document, PopulatedDoc, Schema, model } from "mongoose";
import { UserI } from "./user.schema";
import Task from "./task.schema";

export interface CategoryI extends Document {
    name: string;
    user: PopulatedDoc<UserI>;
}

export const CategorySchema = new Schema<CategoryI>({
    name: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

CategorySchema.post('deleteOne', async function (doc) {
    await Task.deleteMany({ user: doc.user, category: doc._id });
});

CategorySchema.index({ 'user': 1 });
const Category = model<CategoryI>('Category', CategorySchema);

export default Category;