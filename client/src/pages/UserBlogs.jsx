import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import HomePosts from "../components/HomePosts";

const UserBlogs = () => {
  const { user } = useContext(UserContext);
  // const userId = user._id

  const [myBlogs, setMyBlogs] = useState([]);

  const userBlogs = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/post/user/${user._id}`,
      {
        withCredentials: true,
      }
    );
    if (res.status === 200) {
      setMyBlogs(res.data.posts);
    }

    console.log(res);
  };

  useEffect(() => {
    userBlogs();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mx-16 my-10">
      <h1 className="text-center text-4xl uppercase font-bold underline tracking-wider">
        My Blogs
      </h1>

      <p className="text-center my-2 text-xl text-gray-500 font-bold">
        {myBlogs?.length} blogs found
      </p>

      {myBlogs.map((post) => (
        <HomePosts post={post} />
      ))}
    </div>
  );
};

export default UserBlogs;
