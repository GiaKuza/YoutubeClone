const express = require("express");
const router = express.Router();
const { Comment, validateComment } = require("../models/comment");
const { Reply, validateReply } = require("../models/reply");

//Gets all comments related to a video
router.get("/comments/videos/:videoId", async (req, res) => {
	try {
		const comment = await Comment.find({
			videoId: { $eq: req.params.videoId },
		});
		return res.send(comment);
	} catch (ex) {
		return res.status(500).send(`Internal Server Erro ${ex}`);
	}
});
//adds new comment to specific video
router.post("/comments", async (req, res) => {
	try {
		const { error } = validateComment(req.body);
		if (error) return res.status(400).send(error);

		const comment = new Comment({
			text: req.body.text,
			videoId: req.body.videoId,
		});
		await comment.save();
		return res.send(comment);
	} catch (ex) {
		return res.status(500).send(`Internal Server Error: ${ex}`);
	}
});
//adds new reply to specific comment
router.post("/comments/:commentId/replies", async (req, res) => {
	try {
		const { error } = validateReply(req.body);
		if (error) return res.status(400).send(error);

		const reply = new Reply({
			text: req.body.text,
		});
		const comment = await Comment.findById(req.params.commentId);
		comment.reply.push(reply);
		await comment.save();
		return res.send(comment);
	} catch (ex) {
		return res.status(500).send(`Internal Server Error: ${ex}`);
	}
});
//updates likes on specific comment
router.put("/comments/:commentId/likes", async (req, res) => {
	try {
		const comment = await Comment.findById(req.params.commentId);
		comment.likes += 1;
		await comment.save();
		return res.send(comment);
	} catch (ex) {
		return res.status(500).send(`Internal Server Error: ${ex}`);
	}
});
//updates dislikes on specific comment
router.put("/comments/:commentId/dislikes", async (req, res) => {
	try {
		const comment = await Comment.findById(req.params.commentId);
		comment.dislikes += 1;
		await comment.save();
		return res.send(comment);
	} catch (ex) {
		return res.status(500).send(`Internal Server Error: ${ex}`);
	}
});

module.exports = router;
