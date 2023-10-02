import React from "react";
import Dog from "../assets/husky-dog.jpg";

const ProfilePosts = () => {
  return (
    <div className="w-full md:flex items-center justify-center mt-8 space-x-4 shadow shadow-gray-600">
      {/* LEFT */}
      <div className="w-1/3 h-[240px] flex justify-center items-center ">
        <img src={Dog} alt="post" className="h-full w-full object-cover" />
      </div>

      {/* RIGHT */}
      <div className="w-2/3 flex flex-col px-4">
        <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl">
          Title Lorem ipsum dolor sit amet.
        </h1>

        <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4">
          <p>@nandi1514</p>
          <div className="flex space-x-4">
            <p>16-06-2023</p>
            <p>16:45</p>
          </div>
        </div>

        <div className="">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
          reprehenderit ea iste aut molestiae assumenda error veritatis quod
          harum eaque, quia nostrum ad sit reiciendis, ipsa minus. Quas aliquid
          maiores eligendi qui sint voluptatem nam quae, placeat exercitationem
          dolorum, nulla deserunt facere eaque, minima quasi tempore doloribus
          cum voluptates enim.
        </div>
      </div>
    </div>
  );
};

export default ProfilePosts;
