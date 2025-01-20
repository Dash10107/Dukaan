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
  console.log("orders", orderState);

  return (
    <>
      <BreadCrumb title="My Orders" />
      <Meta title={"My Orders"} />
      <Container>
        <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
          <table className="w-full text-left table-auto min-w-max">
            <thead>
              <tr>
                <th className="p-4 border-b border-slate-200 bg-slate-50">
                  <p className="text-sm font-normal text-center leading-none text-slate-500">
                    Order ID
                  </p>
                </th>
                <th className="p-4 border-b border-slate-200 bg-slate-50">
                  <p className="text-sm font-normal text-center leading-none text-slate-500">
                    Total Amount
                  </p>
                </th>
                <th className="p-4 border-b border-slate-200 bg-slate-50">
                  <p className="text-sm font-normal text-center leading-none text-slate-500">
                    Total After Discount
                  </p>
                </th>
                <th className="p-4 border-b border-slate-200 bg-slate-50">
                  <p className="text-sm font-normal text-center leading-none text-slate-500">
                    Status
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              {orderState &&
                orderState.map((order) => (
                  <tr className="hover:bg-slate-50 border-b border-slate-200">
                    <td className="p-4 py-5">
                      <p className="text-sm text-slate-800">{order?._id}</p>
                    </td>
                    <td className="p-4 py-5">
                      <p className="text-sm text-slate-800">
                        {order?.totalPrice}
                      </p>
                    </td>
                    <td className="p-4 py-5">
                      <p className="text-sm text-slate-800">
                        {order?.totalPriceAfterDiscount}
                      </p>
                    </td>
                    <td className="p-4 py-5">
                      <p className="text-sm text-slate-800">
                        {order?.orderStatus}
                      </p>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* <div className="row mb-5">
          <div className="col-12">
            <div className="row">
              <div className="col-3">
                <h5>Order Id</h5>
              </div>
              <div className="col-3">
                <h5>Total Amount</h5>
              </div>
              <div className="col-3">
                <h5>Total After Discount</h5>
              </div>
              <div className="col-3">
                <h5>Status</h5>
              </div>
            </div>
            <div className="col-12 mt-3">
              {orderState &&
                orderState.map((order) => {
                  return (
                    <div
                      className="row pt-3 my-3"
                      style={{ backgroundColor: "#febd69" }}
                      key={order?._id}
                    >
                      <div className="col-3">
                        <p>{order?._id}</p>
                      </div>
                      <div className="col-3">
                        <p>{order?.totalPrice}</p>
                      </div>
                      <div className="col-3">
                        <p>{order?.totalPriceAfterDiscount}</p>
                      </div>
                      <div className="col-3">
                        <p>{order?.orderStatus}</p>
                      </div>
                      <div className="col-12">
                        <div
                          className="row  py-3"
                          style={{ backgroundColor: "#232f3e" }}
                        >
                          <div className="col-3">
                            <h6 className="text-white">Product Name</h6>
                          </div>
                          <div className="col-3">
                            <h6 className="text-white">Quantity</h6>
                          </div>
                          <div className="col-3">
                            <h6 className="text-white">Price</h6>
                          </div>
                          <div className="col-3">
                            <h6 className="text-white">Color</h6>
                          </div>

                          {order?.orderItems?.map((item) => {
                            return (
                              <div className="col-12" key={item?._id}>
                                <div className="row  py-3">
                                  <div className="col-3">
                                    <p className="text-white">{item?._id}</p>
                                  </div>
                                  <div className="col-3">
                                    <p className="text-white">
                                      {item?.quantity}
                                    </p>
                                  </div>
                                  <div className="col-3">
                                    <p className="text-white">{item?.price}</p>
                                  </div>
                                  <div className="col-3">
                                    <ul className="colors ps-0">
                                      <Color colorName={item?.color} />
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div> */}
      </Container>
    </>
  );
};

export default Order;
