import React, { useEffect } from "react";
import Container from "../components/Container";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { useDispatch, useSelector } from "react-redux";
import { getMyOrders } from "../features/products/productSlice";
import Color from "../components/Color";

const Order = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  const orderState = useSelector((state) => state?.product?.orderState?.orders);

  return (
    <>
      <Meta title={"My Orders"} />
      <BreadCrumb title="My Orders" />
      <Container>
        <div className="bg-white shadow-md rounded-lg overflow-hidden w-[80%] mx-auto py-4">
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total After Discount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orderState &&
                  orderState.map((order) => (
                    <tr key={order?._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {order?._id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${order?.totalPrice}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${order?.totalPriceAfterDiscount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order?.orderStatus === 'Delivered' ? 'bg-green-100 text-green-800' :
                          order?.orderStatus === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {order?.orderStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <button
                          className="text-indigo-600 hover:text-indigo-900"
                          onClick={() => {
                            // Implement order details view functionality here
                            console.log("View details for order:", order?._id);
                          }}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {orderState && orderState.map((order) => (
          <div key={order?._id} className="mt-8 bg-white shadow-md rounded-lg overflow-hidden">
            <div className="bg-gray-100 px-6 py-4">
              <h3 className="text-lg font-semibold text-gray-900">Order Details: {order?._id}</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Color
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {order?.orderItems?.map((item) => (
                    <tr key={item?._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item?._id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item?.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${item?.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <ul className="flex">
                          <Color colorName={item?.color} />
                        </ul>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </Container>
    </>
  );
};

export default Order;