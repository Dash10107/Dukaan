import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useFormik } from "formik"
import * as yup from "yup"
import { registerUser } from "../features/user/userSlice"
import Meta from "../components/Meta"
import BreadCrumb from "../components/BreadCrumb"

const signUpSchema = yup.object().shape({
  firstname: yup.string().required("First Name is required"),
  lastname: yup.string().required("Last Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  mobile: yup.string().required("Mobile is required"),
  password: yup.string().required("Password is required"),
})

const Signup = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      mobile: "",
      password: "",
    },
    validationSchema: signUpSchema,
    onSubmit: (values) => {
      const result = dispatch(registerUser(values))
      if (registerUser.fulfilled.match(result)) {
        navigate("/login")
      }
    },
  })

  return (
    <>
      <Meta title="Sign Up" />
      <BreadCrumb title="Sign Up" />
      <div className="min-h-screen flex flex-col md:flex-row">
        {/* Left Section with Illustration */}
        <div className="w-full md:w-1/2  flex flex-col items-center justify-center p-8">
          <img
            src="/start.png"
            alt="Shopping Illustration"
            className=" w-full"
          />
          <div className="text-center mt-8">
            <h2 className="text-2xl font-bold text-gray-900">Join Our Platform</h2>
            <p className="mt-2 text-gray-600">Create an account to access all features</p>
          </div>
        </div>

        {/* Right Section with Form */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold">DiG!C</h1>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-2">Create your account</h2>
            <p className="text-gray-600 mb-8">
              Already have an account?{" "}
              <Link to="/login" className="text-purple-600 hover:text-purple-500">
                Sign in
              </Link>
            </p>

            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="firstname"
                  placeholder="First name"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent ${
                    formik.touched.firstname && formik.errors.firstname ? "border-red-500" : "border-gray-300"
                  }`}
                  {...formik.getFieldProps("firstname")}
                />
                {formik.touched.firstname && formik.errors.firstname && (
                  <p className="mt-1 text-sm text-red-500">{formik.errors.firstname}</p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  name="lastname"
                  placeholder="Last name"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent ${
                    formik.touched.lastname && formik.errors.lastname ? "border-red-500" : "border-gray-300"
                  }`}
                  {...formik.getFieldProps("lastname")}
                />
                {formik.touched.lastname && formik.errors.lastname && (
                  <p className="mt-1 text-sm text-red-500">{formik.errors.lastname}</p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent ${
                    formik.touched.email && formik.errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  {...formik.getFieldProps("email")}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="mt-1 text-sm text-red-500">{formik.errors.email}</p>
                )}
              </div>

              <div>
                <input
                  type="tel"
                  name="mobile"
                  placeholder="Mobile"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent ${
                    formik.touched.mobile && formik.errors.mobile ? "border-red-500" : "border-gray-300"
                  }`}
                  {...formik.getFieldProps("mobile")}
                />
                {formik.touched.mobile && formik.errors.mobile && (
                  <p className="mt-1 text-sm text-red-500">{formik.errors.mobile}</p>
                )}
              </div>

              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent ${
                    formik.touched.password && formik.errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                  {...formik.getFieldProps("password")}
                />
                {formik.touched.password && formik.errors.password && (
                  <p className="mt-1 text-sm text-red-500">{formik.errors.password}</p>
                )}
              </div>

              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="h-4 w-4 text-gray-600 focus:ring-gray-600 border-gray-300 rounded"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                  I agree to the{" "}
                  <a href="#" className="text-gray-600 hover:text-gray-800">
                    Terms
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-gray-600 hover:text-gray-800">
                    Privacy Policy
                  </a>
                </label>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
              >
                Sign up
              </button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">OR SIGN UP WITH</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <span>Google</span>
                </button>
                <button
                  type="button"
                  className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <span>GitHub</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup

