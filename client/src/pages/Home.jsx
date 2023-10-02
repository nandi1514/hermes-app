import React, { useEffect, useState } from "react";
import HomePosts from "../components/HomePosts";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import Loader from "../components/Loader";

const Home = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [loader, setLoader] = useState(true);

  const { search } = useLocation();

  const fetchAllPosts = async () => {
    setLoader(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/post/${search}`
      );

      setAllPosts(data?.allPosts);
      setLoader(false);
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchAllPosts();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <div className="px-8 md:px-[200px] min-h-[80vh] ">
      <div className="">
        {loader ? (
          <Loader />
        ) : allPosts ? (
          allPosts?.map((post) => (
            <Link key={post._id} to={`/posts/post/${post._id}`}>
              <HomePosts post={post} key={post._id} />
            </Link>
          ))
        ) : (
          <p className="text-center font-bold mt-16 text-4xl">{`No posts found with ${
            search.split("=")[1]
          }`}</p>
        )}
      </div>
    </div>
  );
};

export default Home;
