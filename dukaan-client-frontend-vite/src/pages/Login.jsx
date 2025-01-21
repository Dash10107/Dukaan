import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useFormik } from "formik"
import * as yup from "yup"
import { loginUser } from "../features/user/userSlice"
import Meta from "../components/Meta"
import BreadCrumb from "../components/BreadCrumb"
import Container from "../components/Container"

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
})

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      dispatch(loginUser(values))
      setTimeout(() => {
        if (localStorage.getItem("user") !== null) {
          navigate("/")
        }
      }, 1000)
    },
  })

  return (
    <>
      <Meta title="Login" />
      <BreadCrumb title="Login" />
      <div className="min-h-screen flex flex-col md:flex-row">
        {/* Left Section with Illustration */}
        <div className="w-full md:w-1/2  flex flex-col items-center justify-center p-8">
          <img
            src="/start.png"
            alt="Shopping Illustration"
            className=" w-full"
          />
          <div className="text-center mt-8">
            <h2 className="text-2xl font-bold text-gray-900">Secure Admin Access</h2>
            <p className="mt-2 text-gray-600">Manage your application with a powerful admin dashboard</p>
          </div>
        </div>

        {/* Right Section with Form */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold">Dukaan</h1>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign in to your account</h2>
            <p className="text-gray-600 mb-8">
              Or{" "}
              <Link to="/signup" className="text-purple-600 hover:text-purple-500">
                create a new account
              </Link>
            </p>

            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email address"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                      formik.touched.email && formik.errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    {...formik.getFieldProps("email")}
                  />
                </div>
                {formik.touched.email && formik.errors.email && (
                  <p className="mt-1 text-sm text-red-500">{formik.errors.email}</p>
                )}
              </div>

              <div>
                <div className="relative">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-600 focus:border-transparent ${
                      formik.touched.password && formik.errors.password ? "border-red-500" : "border-gray-300"
                    }`}
                    {...formik.getFieldProps("password")}
                  />
                </div>
                {formik.touched.password && formik.errors.password && (
                  <p className="mt-1 text-sm text-red-500">{formik.errors.password}</p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-gray-800 focus:ring-gray-600 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <Link to="/forgot-password" className="text-sm text-purple-600 hover:text-purple-500">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
              >
                Sign in
              </button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">OR CONTINUE WITH</span>
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

export default Login

