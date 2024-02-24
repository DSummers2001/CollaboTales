const mongoose = require('mongoose');
const User = require("./userModel");

const storySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 2,
        max: 25,
        unique: true,
    }, content: {
        type: String,
    }, genre: {
        type: String,
        required: true,
        min: 5,
    }, numberOfLikes: {
        type: Number,
    }, 
    author: {
        type: String,
        required: true,
    }, coAuthorList: {
        type: [String],
    },
});

module.exports = mongoose.model("Story", storySchema);
