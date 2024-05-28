const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, "title is required"],
        minLength: [4, "title must be atleast 4 characters long"],
    },
    media: {
        type: String,
        default: "default.png",
    },

    user:{type: mongoose.Schema.Types.ObjectId, ref: "user"},



},
    {timestamps:true}
);

const Post = mongoose.model("post", postSchema);

module.exports = Post;