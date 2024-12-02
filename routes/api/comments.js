const express = require("express");
const router = express.Router();

const comments = []; // Placeholder for comments data

// GET all comments
router.get("/", (req, res) => {
  res.status(200).json(comments);
});

// POST a new comment
router.post("/", (req, res) => {
  const { userId, postId, body } = req.body;
  if (!userId || !postId || !body) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const newComment = { id: comments.length + 1, userId, postId, body };
  comments.push(newComment);
  res.status(201).json(newComment);
});

// GET a specific comment by ID
router.get("/:id", (req, res) => {
  const comment = comments.find((c) => c.id === parseInt(req.params.id, 10));
  if (comment) res.status(200).json(comment);
  else res.status(404).json({ error: "Comment not found" });
});

// PATCH a comment
router.patch("/:id", (req, res) => {
  const comment = comments.find((c) => c.id === parseInt(req.params.id, 10));
  if (!comment) return res.status(404).json({ error: "Comment not found" });
  comment.body = req.body.body || comment.body;
  res.status(200).json(comment);
});

// DELETE a comment
router.delete("/:id", (req, res) => {
  const index = comments.findIndex((c) => c.id === parseInt(req.params.id, 10));
  if (index === -1) return res.status(404).json({ error: "Comment not found" });
  comments.splice(index, 1);
  res.status(204).send();
});

module.exports = router;
