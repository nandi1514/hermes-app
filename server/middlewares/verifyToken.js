const JWT = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      sucess: false,
      message: "Not authorized. No Token.",
    });
  }

  JWT.verify(token, process.env.JWT_SECRET_KEY, async (err, data) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: "Token is not valid.",
      });
    }
    req.userId = data._id;
    next();
  });
};

module.exports = verifyToken;
