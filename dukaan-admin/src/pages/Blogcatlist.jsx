import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import * as yup from "yup"
import { useFormik } from "formik"
import {
  deleteABlogCat,
  getCategories,
  resetState,
  createNewblogCat,
  getABlogCat,
  updateABlogCat,
} from "../features/bcategory/bcategorySlice"
import { Edit, Trash2, Plus, X, Search } from "lucide-react"

const schema = yup.object().shape({
  title: yup.string().required("Category Name is Required"),
})

export default function BlogcatList() {
  const dispatch = useDispatch()
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("name-asc")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)

  useEffect(() => {
    dispatch(resetState())
    dispatch(getCategories())
  }, [dispatch])

  const bCatState = useSelector((state) => state.bCategory.bCategories)
  const { isSuccess, isError, createBlogCategory, updatedBlogCategory, blogCatName } = useSelector(
    (state) => state.bCategory,
  )

  useEffect(() => {
    if (isSuccess && createBlogCategory) {
      toast.success("Blog Category Added Successfully!")
      setIsModalOpen(false)
    }
    if (isSuccess && updatedBlogCategory) {
      toast.success("Blog Category Updated Successfully!")
      setIsModalOpen(false)
    }
    if (isError) {
      toast.error("Something went wrong!")
    }
  }, [isSuccess, isError, createBlogCategory, updatedBlogCategory])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: editingCategory ? editingCategory.title : "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (editingCategory) {
        dispatch(updateABlogCat({ id: editingCategory._id, blogCatData: values }))
      } else {
        dispatch(createNewblogCat(values))
      }
      formik.resetForm()
      setEditingCategory(null)
    },
  })

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      dispatch(deleteABlogCat(id))
      toast.success("Blog Category deleted successfully")
    }
  }

  const filteredCategories = bCatState
    .filter((category) => category.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      switch (sortBy) {
        case "name-asc":
          return a.title.localeCompare(b.title)
        case "name-desc":
          return b.title.localeCompare(a.title)
        default:
          return 0
      }
    })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Blog Categories</h1>

      {/* Search, Sort and Add Button */}
      <div className="mb-8 space-y-4 md:flex md:items-center md:space-x-4 md:space-y-0">
        <div className="relative flex-2 w-[50%]">
          <input
            type="text"
            placeholder="Search categories..."
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
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
        </select>

        <button
          onClick={() => {
            setEditingCategory(null)
            formik.resetForm()
            setIsModalOpen(true)
          }}
          className="inline-flex items-center rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-black"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </button>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCategories.map((category) => (
          <div
            key={category._id}
            className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="p-4">
              <h3 className="mb-2 text-lg font-semibold text-gray-900">{category.title}</h3>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => {
                    setEditingCategory(category)
                    formik.setValues({ title: category.title })
                    setIsModalOpen(true)
                  }}
                  className="flex-1 rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-black"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(category._id)}
                  className="rounded-lg border border-gray-300 p-2 text-gray-600 hover:bg-gray-50"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50">
          <div className="min-h-screen px-4 text-center">
            <div className="inline-block w-full max-w-md px-6 py-12 my-8 overflow-hidden text-left align-middle bg-white rounded-lg shadow-xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold text-gray-900">
                  {editingCategory ? "Edit Category" : "Add Category"}
                </h3>
                <button
                  onClick={() => {
                    setIsModalOpen(false)
                    setEditingCategory(null)
                    formik.resetForm()
                  }}
                  className="rounded-full p-2 hover:bg-gray-100"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={formik.handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category Name</label>
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

                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false)
                      setEditingCategory(null)
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
                    {editingCategory ? "Update Category" : "Add Category"}
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

