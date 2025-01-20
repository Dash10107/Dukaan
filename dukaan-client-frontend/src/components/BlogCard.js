import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  const imageArray = [
    "images/blog-1.jpg",
    "images/blog-3.webp",
    "images/blog-4.webp",
  ];

  const createdAt = new Date(blog.createdAt);

  const date = createdAt.toDateString();

  return (
    <>
      <div className="cursor-pointer group relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96 hover:shadow-lg transition-shadow duration-300">
        <div className="relative h-56 m-2.5 overflow-hidden text-white rounded-md">
          <img
            className="transition-transform duration-500 ease-[cubic-bezier(0.25, 1, 0.5, 1)] transform group-hover:scale-110"
            src={
              blog?.images?.length > 0
                ? blog.images[0].url
                : imageArray[Math.floor(Math.random() * imageArray.length)]
            }
            alt="investment-seed-round"
          />
        </div>
        <div className="p-4">
          <h6 className="mb-2 text-slate-800 text-xl font-semibold">
            {blog.title}
          </h6>
          <p className="text-slate-600 leading-normal font-light line-clamp-2">
            {blog?.description} Lorem ipsum dolor sit amet consectetur
            adipisicing elit Porro ipsam natus, temporibus debitis quod
            blanditiis nihil! Blanditiis dolores, deserunt mollitia ut dicta
            soluta maiores, reprehenderit esse accusamus voluptate architecto
            laudantium.
          </p>
        </div>
        <div className="px-4 pb-4 pt-0 mt-2">
          <Link
            to={`/blog/${blog._id}`}
            className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          >
            Read article
          </Link>
        </div>
      </div>
      {/* <div className="blog-card">
        <div className="card-image">
          <img
            src={
              blog?.images?.length > 0
                ? blog.images[0].url
                : imageArray[Math.floor(Math.random() * imageArray.length)]
            }
            className="img-fluid w-100"
            alt="blog"
          />
        </div>
        <div className="blog-content">
          <p className="date">{date}</p>
          <h5 className="title">{blog.title}</h5>
          <p className="desc">{blog?.description?.substr(0, 70) + "..."}</p>
          <Link to={`/blog/${blog._id}`} className="button">
            Read More
          </Link>
        </div>
      </div> */}
    </>
  );
};

export default BlogCard;
