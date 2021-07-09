const express = require("express");
const router = express.Router();
const { Comment } = require("../models/comment");
const { Reply } = require("../models/reply");

router.post("/comments", async (req, res) => {
	try {
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

router.post("/comments/replies/:commentId", async (req, res) => {
	try {
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

router.put("/comments/likes/:commentId", async (req, res) => {
	try {
		const comment = await Comment.findById(req.params.commentId);
		comment.likes += 1;
		await comment.save();
		return res.send(comment);
	} catch (ex) {
		return res.status(500).send(`Internal Server Error: ${ex}`);
	}
});

router.put("/comments/dislikes/:commentId", async (req, res) => {
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
