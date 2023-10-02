import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoMdCloseCircle } from "react-icons/io";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { toast } from "react-toastify";

const EditPost = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { id } = useParams();

  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);

  const [cat, setCat] = useState("");
  const [cats, setCats] = useState([]);

  const fetchPostById = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/post/${id}`
      );

      console.log(data);
      setTitle(data.post.title);
      setDesc(data.post.desc);
      setFile(data.post.photo);
      setCats(data.post.categories);

      setLoading(false);
    } catch (error) {
      console.log(error);
      console.log(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPostById();
  }, [id]);

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

  const handleEditPost = async (ev) => {
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

        // image upload
        await axios.post(`${process.env.REACT_APP_SERVER_URL}/upload`, data);
      }

      const res = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/post/${id}`,
        post,
        {
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        navigate(`/posts/post/${id}`);
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
      console.log(error);
    }
  };

  return (
    <div>
      <div className="px-6 md:px-[200px] mt-8">
        <h1 className="font-bold md:text-2xl text-xl text-center uppercase underline tracking-wider">
          Edit a post
        </h1>
        <form className="w-full flex flex-col space-y-4 md:space-y-8 mt-4">
          {/* Title */}
          <input
            onChange={(ev) => setTitle(ev.target.value)}
            type="text"
            placeholder="Enter post title"
            className="px-4 py-2 outline-none border border-black"
            value={title}
          />

          {/* Photo */}
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            className="px-4 "
          />

          {/* Add Category */}
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
                className="bg-black text-white border border-black px-4 py-2 font-semibold cursor-pointer"
              >
                Add
              </div>
            </div>

            {/* Categories */}
            <div className="flex px-4 mt-3">
              {cats?.map((c, i) => (
                <div
                  key={i}
                  className="flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 shadow-lg shadow-slate-500 border-b-2 border-black"
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

          {/* Description */}
          <textarea
            onChange={(e) => setDesc(e.target.value)}
            rows={15}
            cols={30}
            className="px-4 py-2 outline-none border border-black"
            placeholder="Enter post description"
            value={desc}
          />
          <button
            onClick={handleEditPost}
            className="bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg"
          >
            Edit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
