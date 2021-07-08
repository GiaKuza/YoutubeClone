const mongoose = require("mongoose");

const replySchema = mongoose.Schema({
	text: { type: String, require: true, minlength: 1, maxLength: 150 },
	dateAdded: { type: Date, default: Date.now },
});

const Reply = mongoose.model("Reply", replySchema);

module.exports.replySchema = replySchema;
