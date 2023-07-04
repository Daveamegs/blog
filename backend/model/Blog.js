import { Schema } from "mongoose";
import { model } from "mongoose";
import mongoose from "mongoose";

const blogSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    
    image: {
        type: String,
        required: true
    },

    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    }
})

export default model("BlogPost", blogSchema)