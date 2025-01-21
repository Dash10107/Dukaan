import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from 'lucide-react';

const BlogCard = ({ blog }) => {
  const imageArray = [
    "images/blog-1.jpg",
    "images/blog-3.webp",
    "images/blog-4.webp",
  ];

  const createdAt = new Date(blog.createdAt);
  const date = createdAt.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group relative overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-xl "
    >
      <div className="aspect-w-24 aspect-h-9 overflow-hidden">
        <img
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          src={
            blog?.images?.length > 0
              ? blog.images[0].url
              : imageArray[Math.floor(Math.random() * imageArray.length)]
          }
          alt={blog.title}
        />
      </div>
      <div className="p-6">
        <div className="mb-4 flex items-center text-sm text-gray-500">
          <Calendar className="mr-2 h-4 w-4" />
          <time dateTime={createdAt.toISOString()}>{date}</time>
        </div>
        <h3 className="mb-2 text-xl font-bold leading-tight text-gray-900 line-clamp-2">
          {blog.title}
        </h3>
        <p className="mb-4 text-gray-600 line-clamp-3">
          {blog?.description || "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro ipsam natus, temporibus debitis quod blanditiis nihil! Blanditiis dolores, deserunt mollitia ut dicta soluta maiores, reprehenderit esse accusamus voluptate architecto laudantium."}
        </p>
        <Link
          to={`/blog/${blog._id}`}
          className="inline-flex items-center rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-black hover:scale-105 active:scale:95"
        >
          Read More
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </motion.div>
  );
};

export default BlogCard;