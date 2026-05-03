const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
    expression: String,
    result: String
}, { timestamps: true });

module.exports = mongoose.model("History", historySchema);