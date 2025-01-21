import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUsers } from "../features/cutomers/customerSlice"
import { Search, ChevronDown, ChevronUp, Mail, Phone } from "lucide-react"

const Customers = () => {
  const dispatch = useDispatch()
  const [searchTerm, setSearchTerm] = useState("")
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" })

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  const customerstate = useSelector((state) => state.customer.customers)

  const customers = customerstate
    .filter((customer) => customer.role !== "admin")
    .map((customer, index) => ({
      id: customer.id,
      key: index + 1,
      name: `${customer.firstname} ${customer.lastname}`,
      email: customer.email,
      mobile: customer.mobile,
    }))

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.mobile.includes(searchTerm),
  )

  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    if (!sortConfig.key) return 0
    const direction = sortConfig.direction === "ascending" ? 1 : -1
    return a[sortConfig.key].localeCompare(b[sortConfig.key]) * direction
  })

  const requestSort = (key) => {
    let direction = "ascending"
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }
    setSortConfig({ key, direction })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Customers</h1>
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search customers..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {["Name", "Email", "Mobile"].map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort(header.toLowerCase())}
                >
                  <div className="flex items-center">
                    {header}
                    {sortConfig.key === header.toLowerCase() &&
                      (sortConfig.direction === "ascending" ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedCustomers.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={`https://ui-avatars.com/api/?name=${customer.name}&background=random`}
                        alt=""
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Mail size={16} className="text-gray-400 mr-2" />
                    <div className="text-sm text-gray-900">{customer.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Phone size={16} className="text-gray-400 mr-2" />
                    <div className="text-sm text-gray-900">{customer.mobile}</div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Customers

