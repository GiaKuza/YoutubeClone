const mongoose = require("mongoose");
const Joi = require("joi");

const replySchema = new mongoose.Schema({
	text: { type: String, required: true, minlength: 1, maxlength: 150 },
	dateAdded: { type: Date, default: Date.now },
});

const Reply = mongoose.model("Reply", replySchema);

function validateReply(reply) {
	const schema = Joi.object({
		text: Joi.string().min(1).max(150).required(),
	});
	return schema.validate(reply);
}
exports.validateReply = validateReply;
exports.Reply = Reply;
module.exports.replySchema = replySchema;
