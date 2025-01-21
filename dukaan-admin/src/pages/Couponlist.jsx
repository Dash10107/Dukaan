import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import * as yup from "yup"
import { useFormik } from "formik"
import {
  deleteACoupon,
  getAllCoupon,
  createCoupon,
  updateACoupon,
  getACoupon,
  resetState,
} from "../features/coupon/couponSlice"
import { Edit, Trash2, Plus, X, Search, ChevronDown, ChevronUp } from "lucide-react"
import { Link } from "react-router-dom"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

const schema = yup.object().shape({
  name: yup.string().required("Coupon Name is Required"),
  expiry: yup.date().required("Expiry Date is Required"),
  discount: yup.number().required("Discount Percentage is Required"),
})

export default function Couponlist() {
  const dispatch = useDispatch()
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("name-asc")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [couponId, setCouponId] = useState("")

  const couponState = useSelector((state) => state.coupon)
  const { coupons, isSuccess, isError, createdCoupon, updatedCoupon } = couponState

  useEffect(() => {
    dispatch(getAllCoupon())
  }, [dispatch])

  useEffect(() => {
    if (isSuccess && createdCoupon) {
      toast.success("Coupon Added Successfully!")
      setIsModalOpen(false)
      dispatch(getAllCoupon())
    }
    if (isSuccess && updatedCoupon) {
      toast.success("Coupon Updated Successfully!")
      setIsModalOpen(false)
      setEditMode(false)
      dispatch(getAllCoupon())
    }
    if (isError) {
      toast.error("Something Went Wrong!")
    }
  }, [isSuccess, isError, createdCoupon, updatedCoupon, dispatch])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: editMode ? coupons.find((c) => c._id === couponId)?.name || "" : "",
      expiry: editMode
        ? new Date(coupons.find((c) => c._id === couponId)?.expiry || new Date()).toISOString().split("T")[0]
        : "",
      discount: editMode ? coupons.find((c) => c._id === couponId)?.discount || "" : "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (editMode) {
        const data = { id: couponId, couponData: values }
        dispatch(updateACoupon(data))
      } else {
        dispatch(createCoupon(values))
      }
      formik.resetForm()
      setEditMode(false)
      setIsModalOpen(false)
    },
  })

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this coupon?")) {
      dispatch(deleteACoupon(id))
      setTimeout(() => {
        dispatch(getAllCoupon())
      }, 100)
    }
  }

  const handleEdit = (id) => {
    setEditMode(true)
    setCouponId(id)
    dispatch(getACoupon(id))
    setIsModalOpen(true)
  }

  const filteredCoupons = coupons
    .filter(
      (coupon) =>
        coupon.name.toLowerCase().includes(searchTerm.toLowerCase()) || coupon.discount.toString().includes(searchTerm),
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "name-asc":
          return a.name.localeCompare(b.name)
        case "name-desc":
          return b.name.localeCompare(a.name)
        case "discount-asc":
          return a.discount - b.discount
        case "discount-desc":
          return b.discount - a.discount
        default:
          return 0
      }
    })

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search, Sort and Add Button */}
      <div className="mb-8 space-y-4 md:flex md:items-center md:space-x-4 md:space-y-0">
        <div className="relative flex-2 w-[50%]">
          <input
            type="text"
            placeholder="Search coupons..."
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
          <option value="discount-asc">Discount (Low-High)</option>
          <option value="discount-desc">Discount (High-Low)</option>
        </select>

        <button
          onClick={() => {
            setEditMode(false)
            setIsModalOpen(true)
          }}
          className="inline-flex items-center rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-black"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Coupon
        </button>
      </div>

      {/* Coupon Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filteredCoupons.map((coupon) => (
          <div
            key={coupon._id}
            className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="p-4">
              <h3 className="mb-2 text-lg font-semibold text-gray-900">{coupon.name}</h3>

              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-gray-500">Discount</span>
                <span className="text-lg font-bold text-green-600">{coupon.discount}%</span>
              </div>

              <div className="mb-4">
                <span className="text-sm text-gray-500">Expires: </span>
                <span className="text-sm font-medium text-gray-700">
                  {new Date(coupon.expiry).toLocaleDateString()}
                </span>
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => handleEdit(coupon._id)}
                  className="flex-1 rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-black"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(coupon._id)}
                  className="rounded-lg border border-gray-300 p-2 text-gray-600 hover:bg-gray-50"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Coupon Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50">
          <div className="min-h-screen px-4 text-center">
            <div className="inline-block w-full max-w-md px-6 py-12 my-8 overflow-hidden text-left align-middle bg-white rounded-lg shadow-xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold text-gray-900">{editMode ? "Edit Coupon" : "Add Coupon"}</h3>
                <button
                  onClick={() => {
                    setIsModalOpen(false)
                    setEditMode(false)
                    formik.resetForm()
                  }}
                  className="rounded-full p-2 hover:bg-gray-100"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={formik.handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Coupon Name</label>
                  <input
                    type="text"
                    name="name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
                  />
                  {formik.touched.name && formik.errors.name && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                  <input
                    type="date"
                    name="expiry"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.expiry}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
                  />
                  {formik.touched.expiry && formik.errors.expiry && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.expiry}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Discount Percentage</label>
                  <input
                    type="number"
                    name="discount"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.discount}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
                  />
                  {formik.touched.discount && formik.errors.discount && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.discount}</p>
                  )}
                </div>

                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false)
                      setEditMode(false)
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
                    {editMode ? "Update Coupon" : "Add Coupon"}
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

