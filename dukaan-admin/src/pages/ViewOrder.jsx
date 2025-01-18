import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import { getOrderByUser, getOrders } from "../features/auth/authSlice";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Product Name",
    dataIndex: "name",
  },
  // {
  //   title: "Brand",
  //   dataIndex: "brand",
  // },
  {
    title: "Count",
    dataIndex: "count",
  },
  {
    title: "Color",
    dataIndex: "color",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Date",
    dataIndex: "date",
  },

  {
    title: "Action",
    dataIndex: "action",
  },
];

const ViewOrder = () => {
  const {userId,orderId} = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrderByUser(userId));
  }, []);
  const orderState = useSelector((state) => state.auth?.orderbyuser);
  console.log('ordersate',orderState);
  const data1 = [];
  for (let i = 0; i < orderState?.length; i++) {
    if(orderState[i]?._id === orderId){
      for (let j = 0; j < orderState[i]?.orderItems?.length; j++) {
    data1.push({
      key: j + 1,
      name: orderState[i]?.orderItems[j]?.title ? orderState[i]?.orderItems[j]?.title : orderState[i]?.orderItems[j]?._id,
      brand: orderState[i]?.orderItems[j]?.brand,
      count: orderState[i]?.orderItems[j]?.quantity,
      color: orderState[i]?.orderItems[j]?.color,
      amount: orderState[i]?.orderItems[j]?.price,
      date: new Date(orderState[i].createdAt).toLocaleString(),
      
      action: (
        <>
          <Link to="/" className=" fs-3 text-danger">
            <BiEdit />
          </Link>
          <Link className="ms-3 fs-3 text-danger" to="/">
            <AiFillDelete />
          </Link>
        </>
      ),
    });
  }
}else{
  console.log('no order');
}
  }
  return (
    <div>
      <h3 className="mb-4 title">View Order</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default ViewOrder;
