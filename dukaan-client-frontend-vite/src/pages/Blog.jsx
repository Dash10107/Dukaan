import React, { useEffect } from 'react'
import Meta from '../components/Meta'
import BreadCrumb from '../components/BreadCrumb'
import BlogCard from '../components/BlogCard'
import Container from '../components/Container'
import { useDispatch, useSelector } from 'react-redux'
import { getBlogs } from '../features/blogs/blogSlice'

const Blog = () => {
  const dispatch = useDispatch()
  const getAllBlogs = () => {
    dispatch(getBlogs())
  }
  useEffect(() => { getAllBlogs() }, [])
  const blogsState = useSelector(state => state?.blog?.blogs)

  return (
    <>
      <Meta title={"Blogs"} />
      <BreadCrumb title="Blogs" />
      <Container class1="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="hidden lg:block lg:col-span-3">
              <div className="bg-white shadow rounded-lg p-6 sticky top-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Find By Categories</h3>
                <ul className="space-y-2">
                  {['Watch', 'TV', 'Camera', 'Laptop'].map((category, index) => (
                    <li key={index} className="text-gray-600 hover:text-gray-900 cursor-pointer">{category}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-8 lg:mt-0 lg:col-span-9">
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {blogsState.map((blog) => (
                  <div key={blog._id}>
                    <BlogCard blog={blog} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default Blog