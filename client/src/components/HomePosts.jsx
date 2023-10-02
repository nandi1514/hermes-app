import React from "react";
import { FaArrowRight } from "react-icons/fa";

const HomePosts = ({ post }) => {
  return (
    <div className="w-full md:flex items-center justify-center mt-8 space-x-4 shadow shadow-gray-600">
      {/* LEFT */}
      <div className="w-1/3 h-[240px] flex justify-center items-center ">
        <img
          src={`${process.env.REACT_APP_IMAGE_FOLDER}/${post?.photo}`}
          alt={post?.title}
          className="h-full w-full object-cover"
        />
      </div>

      {/* RIGHT */}
      <div className="w-2/3 flex flex-col px-4">
        <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl">
          {post.title}
        </h1>

        <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4">
          <p>@{post.username} </p>
          <div className="flex space-x-4">
            <p>{new Date(post.createdAt).toLocaleTimeString()}</p>
            <p>{new Date(post.createdAt).toDateString()}</p>
          </div>
        </div>

        <div className="">{post.desc.slice(0, 250)}.....</div>

        <div className="flex gap-2 items-center justify-start text-cyan-500 font-bold underline">
          Read More...
          <FaArrowRight className="underline hover:scale-105 transition-transform" />
        </div>
      </div>
    </div>
  );
};

export default HomePosts;
