import React, { useEffect } from 'react'
import Meta from '../components/Meta'
import BreadCrumb from '../components/BreadCrumb'
import Container from '../components/Container'
import { Link, useParams } from 'react-router-dom'
import { HiOutlineArrowLeft } from "react-icons/hi"
import { useDispatch, useSelector } from 'react-redux'
import { getABlog } from '../features/blogs/blogSlice'

const SingleBlog = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const getBlog = () => {
    dispatch(getABlog(id))
  }
  useEffect(() => { getBlog() }, [])
  const blogState = useSelector(state => state?.blog?.currentBlog)

  const imageArray = ["/images/blog-1.jpg", "/images/blog-3.webp", "/images/blog-4.webp"]

  return (
    <>
      <Meta title={blogState?.title} />
      <BreadCrumb title={blogState?.title} />
      <Container class1="bg-gray-100 py-12">
        <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            <Link to="/blogs" className="inline-flex items-center text-gray-800 hover:text-black hover:scale-105 active:scale-95 hover:transition-all hover:duration-200 mb-6">
              <HiOutlineArrowLeft className="mr-2" /> Go back to Blogs
            </Link>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2 sm:mb-0">{blogState?.title}</h1>
              <p className="text-sm text-gray-500">
                {new Date(blogState?.createdAt).toLocaleDateString()}
              </p>
            </div>
            <img 
              src={blogState?.images?.length > 0 ? blogState.images[0].url : imageArray[Math.floor(Math.random() * imageArray.length)]} 
              className="w-full h-[28rem] object-cover rounded-lg mb-6" 
              alt="blog" 
            />
            <div 
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: blogState?.description }}
            />
          </div>
        </div>
      </Container>
    </>
  )
}

export default SingleBlog