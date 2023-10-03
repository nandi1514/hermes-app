const express = require("express");
const colors = require("colors");
const cors = require("cors");
const multer = require("multer");
const dotenv = require("dotenv");
const path = require("path");
const { connectDB } = require("./utils/connectDB");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const postRouter = require("./routes/postRoutes");
const commentRouter = require("./routes/commentRoutes");

const app = express();

// environment variables
dotenv.config();

// middlewares
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/images", express.static(path.join(__dirname, "/images")));

// database
connectDB();

// Routes
// app.use("/", (req, res) => {
//   return res.status(200).json("Hermes App Server Working.");
// });
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
app.use("/api/comments", commentRouter);

// image upload
const storage = multer.diskStorage({
  destination: (req, file, fn) => {
    return fn(null, "images");
  },
  filename: (req, file, fn) => {
    return fn(null, req.body.img);
    //   // fn(null,"image1.jpg")
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Image has been uploaded successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error in image upload. ${error.message}`,
      error,
    });
  }
});

// PORT
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(` App is running on PORT:${PORT} `.bgCyan.black);
});
