import React, { useContext, useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Comment from "../components/Comment";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";

const PostDetails = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState("");
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const fetchPostById = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/post/${id}`
      );

      setPost(data.post);
      setLoading(false);
    } catch (error) {
      console.log(error);
      console.log(error.message);
      setLoading(false);
    }
  };

  const handleDeletePost = async () => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/post/${id}`,
        {
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        toast.success("Post deleted successfully.");
        navigate("/");
      }

      console.log(res);

      // setPost(res.data);
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
      console.log(error);
    }
  };

  const handleEditPost = async () => {
    navigate(`/edit/${id}`);
  };

  const fetchPostComments = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/comments/post/${id}`
      );

      if (res.status === 200) {
        setComments(res.data.allCommentsOnPost);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddComment = async (ev) => {
    ev.preventDefault();

    try {
      if (!user) {
        toast.error("Please login");
        navigate("/login");
      }

      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/comments/create`,
        {
          comment: comment,
          postId: id,
          author: user.username,
          userId: user._id,
        },
        { withCredentials: true }
      );

      

      if (res.status === 200) {
        toast.success("Comment Added");
        window.location.reload();
        fetchPostComments();
        setComment("");
      }
    } catch (error) {
      // toast.error(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPostById();
    fetchPostComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="px-8 md:px-[200px] mt-8 ">
          {/* Title */}
          <div className="">
            <h1 className="text-3xl text-center font-bold text-black md:text-3xl">
              {post?.title}
            </h1>
          </div>

          {/* Username, Date & Time */}
          <div className="flex text-xl items-center justify-between font-semibold text-gray-500 my-2 md:mt-4">
            <p>@{post?.username} </p>
            <div className="flex space-x-2">
              <p>{new Date(post?.createdAt).toDateString()}</p>
              <p>{new Date(post?.createdAt).toLocaleTimeString()}</p>
            </div>

            <div
              className={`flex items-center justify-center space-x-2 ${
                user?._id === post.userId ? "block" : "hidden"
              } `}
            >
              <p>
                <FaEdit
                  onClick={handleEditPost}
                  className="text-emerald-700 cursor-pointer text-xl"
                />
              </p>
              <p>
                <FaTrash
                  className="text-red-700 cursor-pointer text-xl"
                  onClick={handleDeletePost}
                />
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="">
            <img
              src={`${process.env.REACT_APP_IMAGE_FOLDER}/${post?.photo}`}
              alt={post?.title}
            />
          </div>

          {/* Post Description */}
          <p className="mx-auto mt-8">{post?.desc}</p>

          {/* Categories */}
          <div className="flex items-center mt-8 space-x-4 font-semibold">
            <p className="">Categories:</p>
            <div className="flex justify-center items-center space-x-2">
              {post?.categories?.map((cat) => (
                <div key={cat} className="bg-gray-300 px-3 py-1 ">
                  {cat}
                </div>
              ))}
            </div>
          </div>

          {/* Comments */}
          <div className="flex flex-col mt-4">
            <h3 className="mt-6 mb-4 font-semibold">Comments:</h3>

            {comments.length === 0
              ? "No comments on this post yet"
              : comments?.map((comment) => (
                  <Comment key={comment._id} comment={comment} />
                ))}

            {/* Write a Comment */}
            <div className="flex w-full flex-col mt-4 md:flex-row">
              <input
                type="text"
                className="md:w-[80%] outline-none px-4 mt-4 md:mt-0 border border-black"
                placeholder="Write a comment"
                onChange={(ev) => setComment(ev.target.value)}
              />

              <button
                className="bg-black text-white px-4 py-2 w-[20%]"
                onClick={handleAddComment}
              >
                Add Comment
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostDetails;
