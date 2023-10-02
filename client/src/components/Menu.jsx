import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Menu = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/auth/logout`,
        {
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        toast.success(user.username + " Logged out ");
        setUser(null);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-black w-[150px] flex flex-col items-start absolute top-14 right-6 md:right-32 cursor-pointer">
      {!user && (
        <h3 className="text-sm tracking-widest text-white hover:text-gray-500  border-white w-full px-4 py-2 ">
          Login
        </h3>
      )}
      {!user && (
        <h3 className="text-sm tracking-widest text-white hover:text-gray-500  border-white w-full px-4 py-2 ">
          Register
        </h3>
      )}
      {user && (
        <Link to={`/profile/${user._id}`}>
          <h3 className="text-sm tracking-widest text-white hover:text-gray-500  border-white w-full px-4 py-2 ">
            Profile
          </h3>
        </Link>
      )}
      {user && (
        <Link to="/write">
          <h3 className="text-sm tracking-widest text-white hover:text-gray-500  border-white w-full px-4 py-2 ">
            Write
          </h3>
        </Link>
      )}
      {user && (
        <Link to={`/blogs/user/${user._id}`}>
          <h3 className="text-sm tracking-widest text-white hover:text-gray-500  border-white w-full px-4 py-2 ">
            My Blogs
          </h3>
        </Link>
      )}
      {user && (
        <h3
          onClick={handleLogout}
          className="text-sm tracking-widest text-white hover:text-gray-500  border-white w-full px-4 py-2 "
        >
          Logout {user?.username}
        </h3>
      )}
    </div>
  );
};

export default Menu;
