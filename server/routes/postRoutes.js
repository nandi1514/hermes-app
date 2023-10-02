const express = require("express");
const {
  createPost,
  editPost,
  deletePost,
  getSinglePostById,
  getAllPost,
  getUserPosts,
} = require("../controllers/postController");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

router.post("/create", verifyToken, createPost);
router.get("/", getAllPost);
router.get("/:id", getSinglePostById);
router.put("/:id", verifyToken, editPost);
router.delete("/:id", verifyToken, deletePost);
router.get("/user/:userId", verifyToken, getUserPosts);

module.exports = router;
