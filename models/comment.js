const mongoose = require("mongoose");
const { replySchema } = require("../models/reply");
const Joi = require("joi");

const commentSchema = new mongoose.Schema({
	text: { type: String, required: true, minlength: 1, maxLength: 150 },
	dateAdded: { type: Date, default: Date.now },
	likes: { type: Number, required: true, default: 0 },
	dislikes: { type: Number, required: true, default: 0 },
	reply: [{ type: replySchema }],
	videoId: { type: String, required: true, minlength: 4, maxlength: 50 },
});

const Comment = mongoose.model("Comment", commentSchema);

function validateComment(comment) {
	const schema = Joi.object({
		text: Joi.string().min(1).max(150).required(),
		videoId: Joi.string().min(4).max(50).required(),
	});
	return schema.validate(comment);
}
exports.validateComment = validateComment;
exports.Comment = Comment;
exports.commentSchema = commentSchema;
