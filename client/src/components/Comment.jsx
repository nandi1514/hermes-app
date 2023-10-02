import React, { useContext } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { toast } from "react-toastify";

const Comment = ({ comment }) => {
  const { user } = useContext(UserContext);

  const commentId = comment?._id;

  // const handleEditComment = async () => {
  //   console.log("Edit comment is clicked");
  // };

  const handleDeleteComment = async () => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/comments/${commentId}`,
        { withCredentials: true }
      );

      console.log(res);
      if (res.status === 200) {
        toast.success("Comment Deleted.");
        // window.location.reload();
      }
    } catch (error) {
      toast.error("Comment Not Deleted.");
      console.log(error.message);
      console.log(error);
    }
  };

  return (
    <div className="p-2 bg-gray-200 border-b my-2 border-black">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <h3 className="font-bold text-gray-600">@{comment.author}</h3>

        <div className="flex justify-center items-center space-x-4">
          <p className="text-gray-500 text-sm">
            {new Date(comment.createdAt).toDateString()}
          </p>
          <p className="text-gray-500 text-sm">
            {new Date(comment.createdAt).toLocaleTimeString()}
          </p>

          {user?._id === comment?.userId && (
            <div className="flex items-center justify-center space-x-2">
              {/* <p>
                <FaEdit
                  className="text-emerald-700 cursor-pointer"
                  onClick={handleEditComment}
                />
              </p> */}
              <p>
                <FaTrash
                  className="text-red-700 cursor-pointer"
                  onClick={handleDeleteComment}
                />
              </p>
            </div>
          )}
        </div>
      </div>

      <p className="px-4 mt-2">{comment.comment}</p>
    </div>
  );
};

export default Comment;
