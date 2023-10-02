const bcrypt = require("bcrypt");
const UserModel = require("../models/UserModel");
// const BlogModel = require("../models/BlogModel");
// const CommentModel = require("../models/CommentModel");

// FUNCTION -> UPDATE PASSWORD, METHOD: PUT,  PATH -> '/user/:id'
const updatePassword = async (req, res) => {
  try {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Password updated successfully.",
      updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error in updating Password :${error.message}`,
      error,
    });
  }
};

// FUNCTION -> DELETE USER, METHOD: DELETE,  PATH -> '/user/:id'
const deleteUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    await user.deleteOne();
    // await BlogModel.findByIdAndDelete({ usreId: req.params.id });
    // await CommentModel.findByIdAndDelete({ userId: req.params.id });

    return res.status(200).json({
      success: true,
      message: "User deleted successfuly.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error in Deleting User: ${error.message}`,
      error,
    });
  }
};

// FUNCTION -> GET USER, METHOD: GET,  PATH -> '/user/:id'
const getUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    const { password, ...userInfo } = user._doc;

    if (!user) {
      return res.status(404).json({
        success: false,
        message: `user with user id ${req.params.id} does not exists.`,
      });
    }

    return res.status(200).json({
      success: true,
      message: `${user.username} user present.`,
      userInfo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error in Getting User: ${error.message}`,
    });
  }
};

module.exports = { updatePassword, deleteUser, getUser };
