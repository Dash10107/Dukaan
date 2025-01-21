import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { Edit, Trash2, Plus, X } from "lucide-react"
import { Link } from "react-router-dom"
import { GetColorName } from "hex-color-to-color-name"
import * as yup from "yup"
import { useFormik } from "formik"
import { createColor, getColors, getAColor, updateAColor, deleteAColor, resetState } from "../features/color/colorSlice"

const schema = yup.object().shape({
  title: yup.string().required("Color is Required"),
})

export default function ColorPage() {
  const dispatch = useDispatch()
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("name-asc")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingColor, setEditingColor] = useState(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [colorToDelete, setColorToDelete] = useState(null)

  const colorState = useSelector((state) => state.color.colors)
  const { isSuccess, isError, isLoading, createdColor, updatedColor, colorName } = useSelector((state) => state.color)

  useEffect(() => {
    dispatch(getColors())
  }, [dispatch])

  useEffect(() => {
    if (isSuccess && createdColor) {
      toast.success("Color Added Successfully!")
      setIsModalOpen(false)
      dispatch(getColors())
    }
    if (isSuccess && updatedColor) {
      toast.success("Color Updated Successfully!")
      setIsModalOpen(false)
      setEditingColor(null)
      dispatch(getColors())
    }
    if (isError) {
      toast.error("Something Went Wrong!")
    }
  }, [isSuccess, isError, isLoading, createdColor, updatedColor])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: editingColor ? editingColor.title : "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const colorName = GetColorName(values.title)
      if (editingColor) {
        const data = { id: editingColor._id, colorData: { title: colorName } }
        dispatch(updateAColor(data))
      } else {
        dispatch(createColor({ title: colorName }))
      }
      formik.resetForm()
      setTimeout(() => {
        dispatch(resetState())
      }, 300)
    },
  })

  const handleDelete = (id) => {
    setColorToDelete(id)
    setDeleteModalOpen(true)
  }

  const confirmDelete = () => {
    dispatch(deleteAColor(colorToDelete))
    setDeleteModalOpen(false)
    setColorToDelete(null)
    setTimeout(() => {
      dispatch(getColors())
    }, 100)
  }

  const filteredColors = colorState
    .filter((color) => color.title.toLowerCase().includes(searchTerm.toLowerCase()))
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
            placeholder="Search colors..."
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
            setEditingColor(null)
            setIsModalOpen(true)
          }}
          className="inline-flex items-center rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-black"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Color
        </button>
      </div>

      {/* Color Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filteredColors.map((color) => (
          <div
            key={color._id}
            className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="p-4">
              <div className="mb-4 h-24 w-full rounded-lg" style={{ backgroundColor: color.title }}></div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">{color.title}</h3>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => {
                    setEditingColor(color)
                    setIsModalOpen(true)
                  }}
                  className="flex-1 rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-black"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(color._id)}
                  className="rounded-lg border border-gray-300 p-2 text-gray-600 hover:bg-gray-50"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Color Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50">
          <div className="min-h-screen px-4 text-center">
            <div className="inline-block w-full max-w-md px-6 py-12 my-8 overflow-hidden text-left align-middle bg-white rounded-lg shadow-xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold text-gray-900">{editingColor ? "Edit Color" : "Add Color"}</h3>
                <button
                  onClick={() => {
                    setIsModalOpen(false)
                    setEditingColor(null)
                    formik.resetForm()
                  }}
                  className="rounded-full p-2 hover:bg-gray-100"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={formik.handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Color</label>
                  <input
                    type="color"
                    name="title"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.title}
                    className="mt-1 block w-full h-12 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:outline-none"
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
                      setEditingColor(null)
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
                    {editingColor ? "Update Color" : "Add Color"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50">
          <div className="min-h-screen px-4 text-center">
            <div className="inline-block w-full max-w-md px-6 py-12 my-8 overflow-hidden text-left align-middle bg-white rounded-lg shadow-xl">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Confirm Deletion</h3>
              <p className="mb-6">Are you sure you want to delete this color?</p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setDeleteModalOpen(false)}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

