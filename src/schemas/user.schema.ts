import { Document, Schema, model } from "mongoose";
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

export interface UserI extends Document {
    username: string;
    password: string;
    isAdmin: boolean;
    generateAccessToken: () => string;
    matchPassword: (password: string) => Promise<boolean>;
}

export const userSchema = new Schema<UserI>({
    username: {
        type: String,
        required: [true, 'Please provide a username'],
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 20
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 6,
        select: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

const User = model<UserI>('User', userSchema);

export default User;