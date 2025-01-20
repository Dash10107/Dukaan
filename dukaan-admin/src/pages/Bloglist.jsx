import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteABlog, getBlogs, createBlogs, updateABlog, resetState } from "../features/blogs/blogSlice"
import { getCategories } from "../features/bcategory/bcategorySlice"
import { Edit, Trash2, Plus, X, Search } from "lucide-react"
import { Link } from "react-router-dom"
import { useFormik } from "formik"
import * as yup from "yup"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { toast } from "react-toastify"

const schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  description: yup.string().required("Description is Required"),
  category: yup.string().required("Category is Required"),
})

export default function BlogList() {
  const dispatch = useDispatch()
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("date-desc")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingBlog, setEditingBlog] = useState(null)

  useEffect(() => {
    dispatch(resetState())
    dispatch(getBlogs())
    dispatch(getCategories())
  }, [dispatch])

  const blogs = useSelector((state) => state.blogs.blogs)
  const categories = useSelector((state) => state.bCategory.bCategories)

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      category: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (editingBlog) {
        dispatch(updateABlog({ id: editingBlog._id, blogData: values }))
        toast.success("Blog updated successfully")
      } else {
        dispatch(createBlogs(values))
        toast.success("Blog created successfully")
      }
      setIsModalOpen(false)
      setEditingBlog(null)
      formik.resetForm()
    },
  })

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      dispatch(deleteABlog(id))
      toast.success("Blog deleted successfully")
    }
  }

  const filteredBlogs = blogs
    .filter(
      (blog) =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.category.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "title-asc":
          return a.title.localeCompare(b.title)
        case "title-desc":
          return b.title.localeCompare(a.title)
        case "date-asc":
          return new Date(a.createdAt) - new Date(b.createdAt)
        case "date-desc":
          return new Date(b.createdAt) - new Date(a.createdAt)
        default:
          return 0
      }
    })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Blog List</h1>

      {/* Search, Sort and Add Button */}
      <div className="mb-8 space-y-4 md:flex md:items-center md:space-x-4 md:space-y-0">
        <div className="relative flex-2 w-[50%]">
          <input
            type="text"
            placeholder="Search blogs..."
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
        </div>

        <select
          className="w-full rounded-lg border border-gray-300 px-4 py-2 md:w-48 flex-1"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="date-desc">Date (Newest First)</option>
          <option value="date-asc">Date (Oldest First)</option>
          <option value="title-asc">Title (A-Z)</option>
          <option value="title-desc">Title (Z-A)</option>
        </select>

        <button
          onClick={() => {
            setEditingBlog(null)
            formik.resetForm()
            setIsModalOpen(true)
          }}
          className="inline-flex items-center rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-black"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Blog
        </button>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredBlogs.map((blog) => (
          <div
            key={blog._id}
            className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="p-4">
              <h3 className="mb-2 text-lg font-semibold text-gray-900">{blog.title}</h3>

              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-gray-500">Category: {blog.category}</span>
                <span className="text-sm text-gray-500">{new Date(blog.createdAt).toLocaleDateString()}</span>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-600 line-clamp-3">{blog.description}</p>
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => {
                    setEditingBlog(blog)
                    formik.setValues({
                      title: blog.title,
                      description: blog.description,
                      category: blog.category,
                    })
                    setIsModalOpen(true)
                  }}
                  className="flex-1 rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-black"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="rounded-lg border border-gray-300 p-2 text-gray-600 hover:bg-gray-50"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Blog Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50">
          <div className="min-h-screen px-4 text-center">
            <div className="inline-block w-full max-w-md px-6 py-12 my-8 overflow-hidden text-left align-middle bg-white rounded-lg shadow-xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold text-gray-900">{editingBlog ? "Edit Blog" : "Add Blog"}</h3>
                <button
                  onClick={() => {
                    setIsModalOpen(false)
                    setEditingBlog(null)
                    formik.resetForm()
                  }}
                  className="rounded-full p-2 hover:bg-gray-100"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={formik.handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Blog Title</label>
                  <input
                    type="text"
                    name="title"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.title}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
                  />
                  {formik.touched.title && formik.errors.title && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.title}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <ReactQuill
                    theme="snow"
                    name="description"
                    onChange={formik.handleChange("description")}
                    value={formik.values.description}
                    className="h-32 rounded-lg"
                  />
                  {formik.touched.description && formik.errors.description && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.description}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 pt-8">Category</label>
                  <select
                    name="category"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.category}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category.title}>
                        {category.title}
                      </option>
                    ))}
                  </select>
                  {formik.touched.category && formik.errors.category && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.category}</p>
                  )}
                </div>

                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false)
                      setEditingBlog(null)
                      formik.resetForm()
                    }}
                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-black"
                  >
                    {editingBlog ? "Update Blog" : "Add Blog"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

