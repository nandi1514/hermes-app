const express = require("express");
const {
  register,
  login,
  logout,
  refetchUser,
} = require("../controllers/authController");

const router = express.Router();

// POST => register
router.post("/register", register);

// POST => login
router.post("/login", login);

// GET => logout
router.get("/logout", logout);

// GET => refetch
router.get("/refetch", refetchUser);

module.exports = router;
