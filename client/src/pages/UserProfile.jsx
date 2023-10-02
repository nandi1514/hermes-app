import React, { useContext, useEffect, useState } from "react";
// import ProfilePosts from "../components/ProfilePosts";
import { FaAt, FaLock, FaUser } from "react-icons/fa";
import { UserContext } from "../context/UserContext";
import axios from "axios";

const UserProfile = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const { user } = useContext(UserContext);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/user/${user?._id}`
      );

      if (res.status === 200) {
        setUsername(res.data.userInfo.username);
        setEmail(res.data.userInfo.email);
      }

      console.log(res);
    } catch (error) {
      console.log(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const changePassword = async (ev) => {
    ev.preventDefault();
  };

  return (
    <div className="px-8 md:px-[200px] gap-4 mt-8 flex md:flex-row flex-col-reverse h-[50vh]">
      {/* <div className="flex flex-col md:w-[70%] w-full ">
        <h1 className="text-xl font-bold mb-4">Your Posts:</h1>
        <ProfilePosts />
      </div> */}

      {user ? (
        <form className="flex items-center justify-center flex-col space-y-4 w-full">
          <h1 className="text-xl font-bold mb-4">Profile:</h1>
          <div className="border-b-2 border-black flex items-center justify-center px-4">
            <FaUser className="text-lg" />

            <input
              type="text"
              className="outline-none px-2 py-2"
              placeholder="Your Username"
              onChange={(ev) => setUsername(ev.target.value)}
            />
          </div>

          <div className="border-b-2 border-black flex items-center justify-center px-4">
            <FaAt className="text-lg" />

            <input
              type="email"
              className="outline-none px-2 py-2"
              placeholder="Your Email"
              onChange={(ev) => setEmail(ev.target.value)}
            />
          </div>

          {/* 
          <div className="border border-black flex items-center justify-center px-4">
            <FaLock className="text-lg" />

            <input
              type="password"
              className="outline-none px-2 py-2"
              placeholder="Your Password"
              value={user?.password}
              onChange={(ev) => setPassword(ev.target.value)}
            />
          </div> 
          */}

          {/* 
          <div className="flex items-center space-x-4 mt-8">
            <button className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400">
              Edit
            </button>
            <button className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400">
              Delete
            </button>
          </div> */}
        </form>
      ) : (
        <p className="">Please Login First</p>
      )}
    </div>
  );
};

export default UserProfile;
