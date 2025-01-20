import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getBrands, createBrand, updateABrand, deleteABrand, resetState } from "../features/brand/brandSlice"
import { Edit, Trash2, Plus, X } from "lucide-react"
import { Link } from "react-router-dom"
import { useFormik } from "formik"
import * as yup from "yup"
import { toast } from "react-toastify"

const schema = yup.object().shape({
  title: yup.string().required("Brand Name is Required"),
})

export default function Brandlist() {
  const dispatch = useDispatch()
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("name-asc")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingBrand, setEditingBrand] = useState(null)

  useEffect(() => {
    dispatch(getBrands())
  }, [dispatch])

  const brandState = useSelector((state) => state.brand.brands)
  const newBrand = useSelector((state) => state.brand)
  const { isSuccess, isError, isLoading, createdBrand, updatedBrand } = newBrand

  useEffect(() => {
    if (isSuccess && createdBrand) {
      toast.success("Brand Added Successfully!")
      setIsModalOpen(false)
      dispatch(getBrands())
    }
    if (isSuccess && updatedBrand) {
      toast.success("Brand Updated Successfully!")
      setIsModalOpen(false)
      setEditingBrand(null)
      dispatch(getBrands())
    }
    if (isError) {
      toast.error("Something Went Wrong!")
    }
  }, [isSuccess, isError, isLoading, createdBrand, updatedBrand])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: editingBrand ? editingBrand.title : "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (editingBrand) {
        const data = { id: editingBrand._id, brandData: values }
        dispatch(updateABrand(data))
      } else {
        dispatch(createBrand(values))
      }
      formik.resetForm()
      setTimeout(() => {
        dispatch(resetState())
      }, 300)
    },
  })

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this brand?")) {
      dispatch(deleteABrand(id))
      setTimeout(() => {
        dispatch(getBrands())
      }, 100)
    }
  }

  const filteredBrands = brandState
    .filter((brand) => brand.title.toLowerCase().includes(searchTerm.toLowerCase()))
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
      {/* Search and Sort */}
      <div className="mb-8 space-y-4 md:flex md:items-center md:space-x-4 md:space-y-0">
        <div className="relative flex-2 w-[50%]">
          <input
            type="text"
            placeholder="Search brands..."
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
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
            setEditingBrand(null)
            setIsModalOpen(true)
          }}
          className="inline-flex items-center rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-black"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Brand
        </button>
      </div>

      {/* Brand Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filteredBrands.map((brand) => (
          <div
            key={brand._id}
            className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="p-4">
              <h3 className="mb-2 text-lg font-semibold text-gray-900">{brand.title}</h3>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => {
                    setEditingBrand(brand)
                    setIsModalOpen(true)
                  }}
                  className="flex-1 rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-black"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(brand._id)}
                  className="rounded-lg border border-gray-300 p-2 text-gray-600 hover:bg-gray-50"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Brand Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50">
          <div className="min-h-screen px-4 text-center">
            <div className="inline-block w-full max-w-md px-6 py-12 my-8 overflow-hidden text-left align-middle bg-white rounded-lg shadow-xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold text-gray-900">{editingBrand ? "Edit Brand" : "Add Brand"}</h3>
                <button
                  onClick={() => {
                    setIsModalOpen(false)
                    setEditingBrand(null)
                    formik.resetForm()
                  }}
                  className="rounded-full p-2 hover:bg-gray-100"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={formik.handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Brand Name</label>
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
                      setEditingBrand(null)
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
                    {editingBrand ? "Update Brand" : "Add Brand"}
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

