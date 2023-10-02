import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { setUser } = useContext(UserContext);

  const handleLogin = async (ev) => {
    try {
      ev.preventDefault();

      const data = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      if (data.status === 200) {
        toast.success(data.data.message);
        setUser(data.data.info);
        navigate("/");
      }
    } catch (err) {
      // toast.error(err.response.data?.message);
      console.log(err);
    }
  };

  return (
    <>
      <div className="w-full flex justify-center items-center h-[80vh] ">
        <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">
          <h1 className="text-xl font-bold text-left">
            Log in to your account
          </h1>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border-2 border-black outline-0"
            type="text"
            placeholder="Enter your email"
            required
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border-2 border-black outline-0"
            type="password"
            placeholder="Enter your password"
            required
          />
          <button
            onClick={handleLogin}
            className="w-full px-4 py-4 font-bold text-white bg-black hover:bg-white hover:text-black text-xl border border-black transition-colors tracking-widest uppercase "
          >
            Log in
          </button>

          <div className="flex justify-center items-center space-x-3">
            <p>New here?</p>
            <Link
              className="text-gray-500 hover:text-black underline"
              to="/register"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
