const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

// Regiseter, POST, '/auth/register'
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (user) {
      return res.status(403).json({
        success: false,
        message: `${email} already in use.`,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({
      success: true,
      message: `${username} user registered successfully.`,
      newUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error in register user: ${error.message}`,
      error,
    });
  }
};

// Login, POST, '/auth/login'
const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(403).json({
        success: false,
        message: `${email} is not registered.`,
      });
    }

    const matchPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!matchPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials.",
      });
    }

    const token = JWT.sign(
      {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "3d" }
    );

    const { password, ...info } = user._doc;
    res
      .cookie("token", token)
      .status(200)
      .json({
        success: true,
        message: `${user.username} login success.`,
        info,
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error in login user: ${error.message}`,
      error,
    });
  }
};

// Logout, GET, '/auth/logout'
const logout = async (req, res) => {
  try {
    res
      .clearCookie("token", { sameSite: "none", secure: "true" })
      .status(200)
      .json({
        success: true,
        message: "User logged out successfully.",
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error in logout user: ${error.message}`,
      error,
    });
  }
};

// Refetch, GET, '/auth/refetch'
const refetchUser = async (req, res) => {
  try {
    const token = req.cookies.token;
    JWT.verify(token, process.env.JWT_SECRET_KEY, {}, async (err, data) => {
      if (err) {
        return res.status(404).json({
          success: false,
          message: `No Token. ${err.message}`,
          err,
        });
      }

      return res.status(200).json({
        success: true,
        message: "User Token Present",
        data,
      });
    });
  } catch (error) {
    return res.status(500).json({
      success: true,
      message: `Error in refetch user: ${error.message}`,
    });
  }
};

module.exports = { register, login, logout, refetchUser };
