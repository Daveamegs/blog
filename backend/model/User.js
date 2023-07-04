import { Schema } from "mongoose";
import mongoose from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
        minLength: 6
    },

    blogs: [
        {
            type: mongoose.Types.ObjectId,
            ref: "BlogPost",
            required: true
        }
    ]
})

export default mongoose.model('User', userSchema);