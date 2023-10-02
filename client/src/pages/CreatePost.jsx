import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdCloseCircle } from "react-icons/io";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";
import axios from "axios";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(UserContext);
  const [cat, setCat] = useState("");
  const [cats, setCats] = useState([]);

  const navigate = useNavigate();

  const addCategory = (ev) => {
    ev.preventDefault();
    let updatedCats = [...cats];
    updatedCats.push(cat);
    setCat("");
    setCats(updatedCats);
  };

  const deleteCategory = (i) => {
    let updatedCats = [...cats];
    updatedCats.splice(i);
    setCats(updatedCats);
  };

  const handleCreatePost = async (ev) => {
    ev.preventDefault();

    try {
      const post = {
        title,
        desc,
        username: user.username,
        userId: user._id,
        categories: cats,
      };

      if (file) {
        const data = new FormData();
        const filename = Date.now() + file.name;
        data.append("img", filename);
        data.append("file", file);
        post.photo = filename;

        // for image upload
        await axios.post(`${process.env.REACT_APP_SERVER_URL}/upload`, data);
      }

      // post upload
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/post/create`,
        post,
        { withCredentials: true }
      );

      // console.log(res);

      if (res.status === 201) {
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <div>
      <div className="px-6 md:px-[200px] mt-8">
        <h1 className="font-bold md:text-2xl text-xl text-center uppercase underline tracking-wider">
          Create a post
        </h1>
        <form className="w-full flex flex-col space-y-4 md:space-y-8 mt-4">
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Enter post title"
            className="px-4 py-2 outline-none border border-black"
          />
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            className="px-4 "
          />
          <div className="flex flex-col">
            <div className="flex items-center">
              <input
                value={cat}
                onChange={(e) => setCat(e.target.value)}
                className="px-4 py-2 outline-none border border-black "
                placeholder="Enter post category"
                type="text"
              />
              <div
                onClick={addCategory}
                className="bg-black text-white border border-l-0 border-black px-4 py-2 font-semibold cursor-pointer hover:bg-white hover:text-black transition-colors"
              >
                Add
              </div>
            </div>

            {/* categories */}
            <div className="flex px-4 mt-3">
              {cats?.map((c, i) => (
                <div
                  key={i}
                  className="flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 shadow shadow-slate-500 border-b-2 border-black "
                >
                  <p>{c}</p>
                  <p
                    onClick={() => deleteCategory(i)}
                    className="text-xl cursor-pointer text-red-600   "
                  >
                    <IoMdCloseCircle />
                  </p>
                </div>
              ))}
            </div>
          </div>
          <textarea
            onChange={(e) => setDesc(e.target.value)}
            rows={15}
            cols={30}
            className="px-4 py-2 outline-none border border-black"
            placeholder="Enter post description"
          />
          <button
            // type="submit"
            onClick={handleCreatePost}
            className="bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg hover:bg-white hover:text-black border border-black transition-colors"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
