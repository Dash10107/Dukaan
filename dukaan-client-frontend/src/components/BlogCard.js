import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({blog}) => {

  const imageArray = ["images/blog-1.jpg","images/blog-3.webp","images/blog-4.webp"]

  const createdAt = new Date(blog.createdAt);

  const date = createdAt.toDateString();

  return (
    <div className="blog-card">
      <div className="card-image">
        <img src={ blog?.images?.length >0 ?   blog.images[0].url : imageArray[Math.floor(Math.random()*imageArray.length)]} className="img-fluid w-100" alt="blog" />
      </div>
      <div className="blog-content">
        <p className="date">{date}</p>
        <h5 className="title">{blog.title}</h5>
        <p className="desc">
          {blog?.description?.substr(0,70) + "..."}
        </p>
        <Link to={`/blog/${blog._id}`} className="button">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;