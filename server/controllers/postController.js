const CommentModel = require("../models/CommentModel");
const PostModel = require("../models/PostModel");

const createPost = async (req, res) => {
  try {
    const newPost = await PostModel(req.body);
    const savedPost = await newPost.save();

    return res.status(201).json({
      success: true,
      message: `Post created successfully`,
      savedPost,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error in create Post ${error.message}`,
    });
  }
};

const getSinglePostById = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: `Post with id ${req.params.id} not found`,
      });
    }

    return res.status(200).json({
      success: true,
      message: `Post with id ${req.params.id} found`,
      post,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error in Getting Post ${error.message}`,
    });
  }
};

const getAllPost = async (req, res) => {
  try {
    const query = req.query;

    const searchFilter = {
      title: { $regex: query.search, $options: "i" },
    };

    const allPosts = await PostModel.find(query.search ? searchFilter : null);

    if (allPosts.length === 0) {
      return res.status(200).json({
        success: false,
        message: `No posts found.`,
      });
    }

    return res.status(200).json({
      success: true,
      message: `${allPosts.length} posts found.`,
      allPosts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error in getting all post`,
    });
  }
};

const editPost = async (req, res) => {
  try {
    const updatedPost = await PostModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: `Post with id ${req.params.id} updated.`,
      updatedPost,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error in editing post`,
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: `Post with if ${req.params.id} not found.`,
      });
    }

    await post.deleteOne();

    await CommentModel.deleteMany({ postId: req.params.id });

    return res.status(200).json({
      success: true,
      message: `Post with id ${req.params.id} deleted.`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error in deleting post ${error.message}`,
      error,
    });
  }
};

const getUserPosts = async (req, res) => {
  try {
    const posts = await PostModel.find({ userId: req.params.userId });

    if (posts.length === 0) {
      return res.status(404).json({
        success: true,
        message: `No post written by ${req.params.userId}`,
      });
    }

    return res.status(200).json({
      success: true,
      message: `${posts.length} post written by ${req.params.userId}`,
      posts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error in getting User Posts ${error.message}`,
    });
  }
};

module.exports = {
  createPost,
  getSinglePostById,
  getAllPost,
  getUserPosts,
  editPost,
  deletePost,
};
