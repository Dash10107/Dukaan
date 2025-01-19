import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteAProductCategory,
  getCategories,
  resetState,
} from "../features/pcategory/pcategorySlice";
import CustomModal from "../components/CustomModal";
import { PlusIcon, X, XIcon } from "lucide-react";

const Categorylist = () => {
  const [open, setOpen] = useState(false);
  const [pCatId, setpCatId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const showModal = (e) => {
    setOpen(true);
    setpCatId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getCategories());
  }, []);
  const pCatStat = useSelector((state) => state.pCategory.pCategories);
  const data1 = [];
  for (let i = 0; i < pCatStat.length; i++) {
    data1.push({
      key: i + 1,
      name: pCatStat[i].title,
      action: (
        <div className="flex justify-around">
          <Link
            to={`/admin/category/${pCatStat[i]._id}`}
            className=" fs-3 text-danger"
          >
            <BiEdit className="h-5 w-5 text-blue-600" />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(pCatStat[i]._id)}
          >
            <AiFillDelete className="h-5 w-5 text-red-500" />
          </button>
        </div>
      ),
    });
  }
  const deleteCategory = (e) => {
    dispatch(deleteAProductCategory(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getCategories());
    }, 100);
  };
  return (
    <div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteCategory(pCatId);
        }}
        title="Are you sure you want to delete this Product Category?"
      />
      <>
        <div className="w-full flex justify-between items-center mb-3 mt-10 pl-3">
          <div>
            <h3 className="text-3xl font-semibold text-slate-800">
              Product Categories
            </h3>
          </div>
          <div className="ml-3">
            <button
              className="flex items-center rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              onClick={() => setIsOpen(true)}
            >
              <PlusIcon className="w-4 h-4 mr-1.5" />
              Add Category
            </button>
          </div>
        </div>
        <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
          <table className="w-full text-left table-auto min-w-max">
            <thead>
              <tr>
                <th className="p-4 border-b border-slate-200 bg-slate-50">
                  <p className="text-sm font-normal text-center leading-none text-slate-500">
                    SNo.
                  </p>
                </th>
                <th className="p-4 border-b border-slate-200 bg-slate-50">
                  <p className="text-sm font-normal text-center leading-none text-slate-500">
                    Name
                  </p>
                </th>
                <th className="p-4 border-b border-slate-200 bg-slate-50">
                  <p className="text-sm font-normal text-center leading-none text-slate-500">
                    Action
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              {data1.map((row) => (
                <tr
                  key={row.key}
                  className="hover:bg-slate-50 border-b border-slate-200"
                >
                  <td className="p-4 py-5">
                    <p className="text-sm text-slate-800">{row.key}</p>
                  </td>
                  <td className="p-4 py-5">
                    <p className="text-sm text-slate-800">{row.name}</p>
                  </td>
                  <td className="p-4 py-5">{row.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Addcategroy isOpen={isOpen} setIsOpen={setIsOpen} />
      </>
    </div>
  );
};

const Addcategroy = ({ isOpen, setIsOpen }) => {
  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300">
          <div className="relative m-4 w-[90%] md:w-[50%] lg:w-[30%] rounded-lg bg-white shadow-sm">
            <div className="relative px-4">
              <div className="mb-6">
                <p className="pt-3 text-xs uppercase text-slate-500 flex justify-between items-center">
                  <span>Enter the category:</span>
                  <button onClick={() => setIsOpen(false)}>
                    <XIcon className="h-5 w-5 text-slate-500" />
                  </button>
                </p>
                <div className="mt-4 space-y-3">
                  <input
                    type="text"
                    name="color"
                    placeholder="Vehicle Color"
                    className="w-full px-4 py-2 rounded-md border border-slate-300 focus:border-slate-800 focus:ring-1 focus:ring-slate-800 outline-none text-sm"
                  />

                  <button className="w-full mt-2 rounded-md bg-slate-800 py-2 px-4 text-center text-sm text-white hover:bg-slate-700 transition-all">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categorylist;










// ---------------

// import React, { useEffect, useState } from "react";
// import { Table } from "antd";
// import { BiEdit } from "react-icons/bi";
// import { AiFillDelete } from "react-icons/ai";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import {
//   deleteAProductCategory,
//   getCategories,
//   resetState,
// } from "../features/pcategory/pcategorySlice";
// import CustomModal from "../components/CustomModal";

// const columns = [
//   {
//     title: "SNo",
//     dataIndex: "key",
//   },
//   {
//     title: "Name",
//     dataIndex: "name",
//     sorter: (a, b) => a.name.length - b.name.length,
//   },

//   {
//     title: "Action",
//     dataIndex: "action",
//   },
// ];

// const Categorylist = () => {
//   const [open, setOpen] = useState(false);
//   const [pCatId, setpCatId] = useState("");
//   const showModal = (e) => {
//     setOpen(true);
//     setpCatId(e);
//   };

//   const hideModal = () => {
//     setOpen(false);
//   };
//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(resetState());
//     dispatch(getCategories());
//   }, []);
//   const pCatStat = useSelector((state) => state.pCategory.pCategories);
//   const data1 = [];
//   for (let i = 0; i < pCatStat.length; i++) {
//     data1.push({
//       key: i + 1,
//       name: pCatStat[i].title,
//       action: (
//         <>
//           <Link
//             to={`/admin/category/${pCatStat[i]._id}`}
//             className=" fs-3 text-danger"
//           >
//             <BiEdit />
//           </Link>
//           <button
//             className="ms-3 fs-3 text-danger bg-transparent border-0"
//             onClick={() => showModal(pCatStat[i]._id)}
//           >
//             <AiFillDelete />
//           </button>
//         </>
//       ),
//     });
//   }
//   const deleteCategory = (e) => {
//     dispatch(deleteAProductCategory(e));
//     setOpen(false);
//     setTimeout(() => {
//       dispatch(getCategories());
//     }, 100);
//   };
//   return (
//     <div>
//       <h3 className="mb-4 title">Product Categories</h3>
//       <div>
//         <Table columns={columns} dataSource={data1} />
//       </div>
//       <CustomModal
//         hideModal={hideModal}
//         open={open}
//         performAction={() => {
//           deleteCategory(pCatId);
//         }}
//         title="Are you sure you want to delete this Product Category?"
//       />
//     </div>
//   );
// };

// export default Categorylist;
