// routes/comments.js
const express = require("express");
const router = express.Router();
const Comment = require("../models/comment");
const mongoose = require("mongoose");

router.post("/", async (req, res) => {
  try {
    const { postId, content } = req.body;
    if (!postId || !content) {
      return res.status(400).json({ error: "postId와 content가 필요합니다" });
    }

    const comment = new Comment({ postId, content });
    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const { postId } = req.query;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ error: "Invalid postId" });
    }

    const comments = await Comment.find({ postId }).sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Comment.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Comment not found" });
    res.json({ message: "삭제됨" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
