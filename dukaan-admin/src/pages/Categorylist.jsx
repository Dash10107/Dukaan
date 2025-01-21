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
  createCategory,
  updateAProductCategory,
} from "../features/pcategory/pcategorySlice";
import CustomModal from "../components/CustomModal";
import { PlusIcon, XIcon } from "lucide-react";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";

let schema = yup.object().shape({
  title: yup.string().required("Category Name is Required"),
});

const Categorylist = () => {
  const [open, setOpen] = useState(false);
  const [pCatId, setpCatId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editCategory, setEditCategory] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetState());
    dispatch(getCategories());
  }, [dispatch]);

  const pCatStat = useSelector((state) => state.pCategory.pCategories);

  const data1 = [];
  for (let i = 0; i < pCatStat.length; i++) {
    data1.push({
      key: i + 1,
      name: pCatStat[i].title,
      action: (
        <div className="flex justify-center gap-4">
          <button
            onClick={() => handleEdit(pCatStat[i])}
            className="fs-3 text-danger bg-transparent border-0"
          >
            <BiEdit className="h-5 w-5 text-blue-600" />
          </button>
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

  const showModal = (id) => {
    setOpen(true);
    setpCatId(id);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const deleteCategory = (id) => {
    dispatch(deleteAProductCategory(id))
      .unwrap()
      .then(() => {
        toast.success("Category Deleted Successfully!");
        dispatch(getCategories());
      })
      .catch(() => {
        toast.error("Failed to Delete Category!");
      });
    setOpen(false);
  };

  const handleEdit = (category) => {
    setEditMode(true);
    setEditCategory(category);
    setIsOpen(true);
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
              className="flex items-center rounded-md bg-slate-800 py-2 px-4 text-center text-sm text-white"
              type="button"
              onClick={() => {
                setEditMode(false);
                setIsOpen(true);
              }}
            >
              <PlusIcon className="w-4 h-4 mr-1.5" />
              Add Category
            </button>
          </div>
        </div>
        <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg">
          <table className="w-full text-left table-auto min-w-max">
            <thead>
              <tr>
                <th className="p-4 border-b border-slate-200 bg-slate-50">SNo.</th>
                <th className="p-4 border-b border-slate-200 bg-slate-50">Name</th>
                <th className="p-4 border-b border-slate-200 bg-slate-50">Action</th>
              </tr>
            </thead>
            <tbody>
              {data1.map((row) => (
                <tr key={row.key} className="hover:bg-slate-50 border-b border-slate-200">
                  <td className="p-4 py-5">{row.key}</td>
                  <td className="p-4 py-5">{row.name}</td>
                  <td className="p-4 py-5">{row.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <AddEditCategoryModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          editMode={editMode}
          editCategory={editCategory}
          dispatch={dispatch}
        />
      </>
    </div>
  );
};

const AddEditCategoryModal = ({ isOpen, setIsOpen, editMode, editCategory, dispatch }) => {
  const formik = useFormik({
    initialValues: {
      title: editCategory?.title || "",
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: (values) => {
      if (editMode) {
        const data = { id: editCategory._id, pCatData: values };
        dispatch(updateAProductCategory(data))
          .unwrap()
          .then(() => {
            toast.success("Category Updated Successfully!");
            setIsOpen(false);
            dispatch(getCategories());
          })
          .catch(() => {
            toast.error("Failed to Update Category!");
          });
      } else {
        dispatch(createCategory(values))
          .unwrap()
          .then(() => {
            toast.success("Category Added Successfully!");
            setIsOpen(false);
            dispatch(getCategories());
          })
          .catch(() => {
            toast.error("Failed to Add Category!");
          });
      }
    },
  });

  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm">
          <div className="relative m-4 w-[90%] md:w-[50%] lg:w-[30%] rounded-lg bg-white shadow-sm">
            <div className="relative px-4 py-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">
                  {editMode ? "Edit Category" : "Add Category"}
                </h3>
                <button onClick={() => setIsOpen(false)}>
                  <XIcon className="h-5 w-5 text-slate-500" />
                </button>
              </div>
              <form onSubmit={formik.handleSubmit} className="mt-4 space-y-3">
                <input
                  type="text"
                  name="title"
                  placeholder="Category Name"
                  className="w-full px-4 py-2 rounded-md border border-slate-300"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.title && formik.errors.title && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.title}</p>
                )}
                <button
                  type="submit"
                  className="w-full mt-4 py-2 bg-slate-800 text-white rounded-md"
                >
                  {editMode ? "Update" : "Add"} Category
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categorylist;
