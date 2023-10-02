import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PostDetails from "./pages/PostDetails";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import UserProfile from "./pages/UserProfile";

// Toast Notification
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserBlogs from "./pages/UserBlogs";

function App() {
  return (
    <div className="">
      <ToastContainer
        theme="dark"
        position="bottom-right"
        pauseOnFocusLoss={false}
        pauseOnHover={false}
      />
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/write" element={<CreatePost />} />
        <Route exact path="/posts/post/:id" element={<PostDetails />} />
        <Route exact path="/edit/:id" element={<EditPost />} />
        <Route exact path="/profile/:id" element={<UserProfile />} />
        <Route exact path="/blogs/user/:id" element={<UserBlogs />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
