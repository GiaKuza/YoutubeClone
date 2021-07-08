const commentSchema = mongoose.Schema({
	text: { type: String, required: true, minlength: 1, maxLength: 150 },
	dateAdded: { type: Date, default: Date.now },
	likes: { type: Number, required: true, default: 0 },
	dislikes: { type: Number, required: true, default: 0 },
	reply: [{ type: replySchema }],
	videoId: { type: String, required: true, minlength: 4, maxlength: 50 },
});

const Comment = mongoose.mode("Comment", commentSchema);
