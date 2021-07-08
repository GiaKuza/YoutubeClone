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

module.exports = router;
