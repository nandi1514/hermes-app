const CommentModel = require("../models/CommentModel");

const createComment = async (req, res) => {
  try {
    const newComment = await CommentModel(req.body);
    await newComment.save();

    return res.status(200).json({
      success: true,
      message: `Comment saved successfully.`,
      newComment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error in creating comment ${error.message}`,
    });
  }
};

const editComment = async (req, res) => {
  try {
    const updatedComment = await CommentModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: `Comment edited successfully,`,
      updatedComment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error in editing comment ${error.message}`,
    });
  }
};

const deleteComment = async (req, res) => {
  try {
    await CommentModel.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: `Comment deleted successfully,`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error in creating comment ${error.message}`,
    });
  }
};

const postComments = async (req, res) => {
  try {
    const allCommentsOnPost = await CommentModel.find({
      postId: req.params.postId,
    });

    return res.status(200).json({
      success: true,
      message: "All comments on the post found",
      allCommentsOnPost,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error in getting comment ${error.message}`,
      error,
    });
  }
};

module.exports = { createComment, editComment, deleteComment, postComments };
