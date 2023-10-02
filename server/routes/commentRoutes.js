const express = require("express");
const {
  editComment,
  deleteComment,
  createComment,
  postComments,
} = require("../controllers/commentController");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

router.post("/create", verifyToken, createComment);
router.put("/:id", verifyToken, editComment);
router.delete("/:id", verifyToken, deleteComment);
router.get("/post/:postId", postComments);

module.exports = router;
