import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Hermes from "../assets/hermes.png";
import { FaBars, FaSearch } from "react-icons/fa";
import Menu from "./Menu";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const [searchPrompt, setSearchPrompt] = useState("");
  const navigate = useNavigate();

  const showMenu = () => {
    setMenu(!menu);
  };

  const { user } = useContext(UserContext);

  return (
    <div className="flex items-center border-b border-black shadow shadow-gray-500 justify-between px-6 md:px-[200px] py-2 ">
      {/* Logo */}
      <h1 className="text-xl font-extrabold">
        <Link to="/">
          <img src={Hermes} alt="logo" className="h-14 w-14" />
        </Link>
      </h1>

      {/* Search Bar */}
      <div className="flex items-center border border-black justify-center w-1/2">
        <input
          type="text"
          className="outline-none px-2 py-1 w-full"
          placeholder="Search"
          onChange={(ev) => setSearchPrompt(ev.target.value)}
        />
        <button
          onClick={() => {
            searchPrompt ? navigate("?search=" + searchPrompt) : navigate("/");
          }}
          className="bg-black text-white hover:text-black hover:bg-white transition-colors text-xl px-4 py-2 border-l border-l-black"
        >
          <FaSearch />
        </button>
      </div>

      {/* Logout */}
      <div className="flex items-center justify-center space-x-0 md:space-x-4 font-semibold tracking-wider">
        {user ? (
          <h3>
            <Link to="/write">Write</Link>
          </h3>
        ) : (
          <h3>
            <Link to="/login">Login</Link>
          </h3>
        )}
        {user && (
          <div onClick={showMenu} className="text-lg">
            <p className="relative">
              <FaBars />
            </p>
            {menu && <Menu />}
          </div>
        )}
      </div>

      {/* Menu */}
      <div onClick={showMenu} className="md:hidden text-lg">
        <p className="relative">
          <FaBars />
        </p>
        {menu && <Menu />}
      </div>
    </div>
  );
};

export default Navbar;
