import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getOrders } from "../features/auth/authSlice";
import { Edit, Trash2, ChevronDown, ChevronUp, Search, Eye } from 'lucide-react';

const Orders = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const orderState = useSelector((state) => state.auth?.orders);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const filteredOrders = orderState.filter(order => 
    order.user.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.user.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.totalPrice.toString().includes(searchTerm)
  );

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const direction = sortConfig.direction === 'ascending' ? 1 : -1;
    if (sortConfig.key === 'name') {
      return `${a.user.firstname} ${a.user.lastname}`.localeCompare(`${b.user.firstname} ${b.user.lastname}`) * direction;
    }
    if (sortConfig.key === 'date') {
      return new Date(a.createdAt) - new Date(b.createdAt) * direction;
    }
    return a[sortConfig.key].toString().localeCompare(b[sortConfig.key].toString()) * direction;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Orders</h1>
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search orders..."
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
              {['Name', 'Amount', 'Date', 'Actions'].map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort(header.toLowerCase())}
                >
                  <div className="flex items-center">
                    {header}
                    {sortConfig.key === header.toLowerCase() && (
                      sortConfig.direction === 'ascending' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedOrders.map((order, index) => (
              <tr key={order._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img className="h-10 w-10 rounded-full" src={`https://ui-avatars.com/api/?name=${order.user.firstname}+${order.user.lastname}&background=random`} alt="" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{order.user.firstname} {order.user.lastname}</div>
                      <div className="text-sm text-gray-500">{order.user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">${order.totalPrice.toFixed(2)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{formatDate(order.createdAt)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <Link to={`/admin/order/${order.user._id}/${order._id}`} className="text-indigo-600 hover:text-indigo-900">
                      <Eye size={18} />
                    </Link>
                    <Link to="/" className="text-blue-600 hover:text-blue-900">
                      <Edit size={18} />
                    </Link>
                    <Link to="/" className="text-red-600 hover:text-red-900">
                      <Trash2 size={18} />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;