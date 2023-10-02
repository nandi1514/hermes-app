const express = require("express");
const {
  updatePassword,
  deleteUser,
  getUser,
} = require("../controllers/userController");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

// UPDATE -> update password
router.put("/:id", verifyToken, updatePassword);

// DELETE -> delete user
router.delete("/:id", verifyToken, deleteUser);

// GET -> get user
router.get("/:id", getUser);

module.exports = router;
