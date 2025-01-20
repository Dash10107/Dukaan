import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteAEnquiry, getEnquiries, resetState, updateAEnquiry } from "../features/enquiry/enquirySlice"
import { Eye, Trash2, Search, ChevronDown, ChevronUp } from "lucide-react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"

export default function Enquiries() {
  const dispatch = useDispatch()
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("date-desc")

  useEffect(() => {
    dispatch(resetState())
    dispatch(getEnquiries())
  }, [dispatch])

  const enquiryState = useSelector((state) => state.enquiry.enquiries)

  const handleStatusChange = (e, id) => {
    const data = { id: id, enqData: e.target.value }
    dispatch(updateAEnquiry(data))
    toast.success("Enquiry status updated successfully")
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this enquiry?")) {
      dispatch(deleteAEnquiry(id))
      toast.success("Enquiry deleted successfully")
    }
  }

  const filteredEnquiries = enquiryState
    .filter(
      (enquiry) =>
        enquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enquiry.mobile.includes(searchTerm),
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "name-asc":
          return a.name.localeCompare(b.name)
        case "name-desc":
          return b.name.localeCompare(a.name)
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
      <h1 className="text-3xl font-bold mb-6">Enquiries</h1>

      {/* Search and Sort */}
      <div className="mb-8 space-y-4 md:flex md:items-center md:space-x-4 md:space-y-0">
        <div className="relative flex-2 w-[50%]">
          <input
            type="text"
            placeholder="Search enquiries..."
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
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
        </select>
      </div>

      {/* Enquiries Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredEnquiries.map((enquiry) => (
          <div
            key={enquiry._id}
            className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="p-4">
              <h3 className="mb-2 text-lg font-semibold text-gray-900">{enquiry.name}</h3>

              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-gray-500">{enquiry.email}</span>
                <span className="text-sm text-gray-500">{enquiry.mobile}</span>
              </div>

              <div className="mb-4">
                <label htmlFor={`status-${enquiry._id}`} className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  id={`status-${enquiry._id}`}
                  value={enquiry.status}
                  onChange={(e) => handleStatusChange(e, enquiry._id)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                  <option value="Submitted">Submitted</option>
                  <option value="Contacted">Contacted</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>

              <div className="mt-4 flex gap-2">
                <Link
                  to={`/admin/enquiries/${enquiry._id}`}
                  className="flex-1 rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-black text-center"
                >
                  View Details
                </Link>
                <button
                  onClick={() => handleDelete(enquiry._id)}
                  className="rounded-lg border border-gray-300 p-2 text-gray-600 hover:bg-gray-50"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

