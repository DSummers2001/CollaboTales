const mongoose = require("mongoose");

const characterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true,
    }, description: {
        type: String,
        required: true,
        unique: true,
        max: 50,
    }, stories: {
        type: String,
        min: 7,
    }, comments: {
        type: String,
        min: 7,
    }
});

module.exports = mongoose.model("Characters", characterSchema);
