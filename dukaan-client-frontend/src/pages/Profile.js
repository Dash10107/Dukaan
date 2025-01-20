import React, { useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { updateUser } from "../features/user/userSlice";
import { FiEdit } from "react-icons/fi";
const profileSchema = yup.object({
  firstname: yup.string().required("First Name is required"),
  lastname: yup.string().required("Last Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  mobile: yup.string().required("Mobile is required"),
});

const Profile = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const [edit, setEdit] = useState(true);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstname: user?.firstname,
      lastname: user?.lastname,
      email: user?.email,
      mobile: user?.mobile,
    },

    validationSchema: profileSchema,
    onSubmit: (values) => {
      dispatch(updateUser(values));
      setEdit(true);
    },
  });
  return (
    <>
      <BreadCrumb title="My Profile" />
      <Meta title={"My Profile"} />
      <Container class1="cart-wrapper home-wrapper-2 py-5">
        {/* <div className="row">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center">
              <h3>My Profile</h3>
              <button className="btn fs-3" onClick={() => setEdit(!edit)}>
                <FiEdit />
              </button>
            </div>
          </div>
          <div className="col-12">
            <form onSubmit={formik.handleSubmit}>
              <div className="form-group">
                <label for="firstname">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstname"
                  aria-describedby="firstnamehelp"
                  placeholder="Enter First Name"
                  disabled={edit}
                  value={formik.values.firstname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                ></input>
                <div className="errors">
                  {formik.touched.firstname && formik.errors.firstname
                    ? formik.errors.firstname
                    : null}
                </div>
              </div>
              <div className="form-group">
                <label for="lastname">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastname"
                  aria-describedby="lastnamehelp"
                  placeholder="Enter Last Name"
                  disabled={edit}
                  value={formik.values.lastname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                ></input>
                <div className="errors">
                  {formik.touched.lastname && formik.errors.lastname
                    ? formik.errors.lastname
                    : null}
                </div>
              </div>
              <div className="form-group">
                <label for="emailaddress">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="emailaddress"
                  aria-describedby="emailHelp"
                  placeholder="Enter Your Email"
                  disabled={edit}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                ></input>
                <small id="emailHelp" className="form-text text-muted">
                  We'll never share your email with anyone else.
                </small>
                <div className="errors">
                  {formik.touched.email && formik.errors.email
                    ? formik.errors.email
                    : null}
                </div>
              </div>
              <div className="form-group">
                <label for="mobileno">Email address</label>
                <input
                  type="number"
                  className="form-control"
                  id="mobileno"
                  aria-describedby="mobileHelp"
                  placeholder="Enter Your Phone No"
                  disabled={edit}
                  value={formik.values.mobile}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                ></input>
                <small id="mobileHelp" className="form-text text-muted">
                  We'll never share your mobile no with anyone else.
                </small>
                <div className="errors">
                  {formik.touched.mobile && formik.errors.mobile
                    ? formik.errors.mobile
                    : null}
                </div>
              </div>

              {edit === false && (
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              )}
            </form>
          </div>
        </div> */}
        <div className="mx-auto mt-10">
          <button className="fixed top-4 right-4 p-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors duration-200">
            <svg
              className="w-6 h-6 dark:hidden"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
            <svg
              className="w-6 h-6 hidden dark:block"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
            </svg>
          </button>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-colors duration-200">
            <div className="relative h-48">
              <img
                src="https://images.unsplash.com/photo-1737200473221-55883c1fddc4?q=80&w=1769&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Cover"
                className="w-full h-full object-cover"
              />
              <div className="absolute -bottom-12 left-6">
                <img
                  src="https://res.cloudinary.com/djv4xa6wu/image/upload/v1735722163/AbhirajK/Abhirajk%20mykare.webp"
                  alt="Profile"
                  className="w-24 h-24 rounded-xl object-cover border-4 border-white shadow-lg"
                />
              </div>
            </div>
            <div className="pt-16 px-6 pb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900"></h1>
                  <p className="text-purple-600">
                    {formik.values.firstname + " " + formik.values.lastname}
                  </p>
                </div>
                <a
                  href="https://abhirajk.vercel.app/"
                  target="_blank"
                  className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
                >
                  View API
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
              <p className="mt-6 text-gray-600">{formik.values.mobile}</p>
              
              <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  Contact
                </h2>
                <a
                  href="mailto:abhirajk@example.com"
                  className="inline-flex items-center text-purple-600 hover:underline"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  {formik.values.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Profile;
