import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { LockIcon, MailIcon, UserIcon } from 'lucide-react'
import { register } from '../features/auth/authSlice'

const schema = yup.object().shape({
  firstname: yup.string().required('First name is required'),
  lastname: yup.string().required('Last name is required'),
  mobile: yup.string().required('Mobile number is required').matches(/^\d{10}$/, 'Mobile must be a 10-digit number'),
  email: yup
    .string()
    .email('Email should be valid')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

const Signup = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  )

  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      mobile: '',
      email: '',
      password: '',
      role: "seller",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(register(values))
    },
  })

  React.useEffect(() => {
    if (isSuccess) {
      navigate('/')
    }
  }, [user, isError, isSuccess, isLoading])

  return (
    <div className="min-h-screen w-full flex">
      {/* Left section with illustration */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center p-8">
        <div className="absolute inset-0 bg-grid-black/[0.03] bg-[size:20px_20px]" />
        <div className="relative z-10 ">
          <img
            src="/start.png"
            alt="Signup illustration"
            className="w-full mx-auto"
          />
          <div className="mt-8 text-center space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">
              Join Our Platform
            </h2>
            <p className="text-gray-500">
              Create an account to access all features
            </p>
          </div>
        </div>
      </div>

      {/* Right section with form */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-xl space-y-8">
          <div className="space-y-4 text-center">
            <div>        
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto" width="150" height="150" viewBox="0 0 192.756 192.756">
  <g fill-rule="evenodd" clip-rule="evenodd">
    <path d="M49.665 79.176c-4.172-3.183-9.644-4.55-18.055-4.55H16.788l-8.284 7.597h9.743v35.972c2.41.327 6.128.65 11.276.65 8.605 0 15.709-1.816 20.34-5.644 4.169-3.573 7.235-9.352 7.235-17.731.001-7.79-2.869-12.924-7.433-16.294zM31.609 111.12c-1.175 0-2.611 0-3.452-.192V82.223h4.493c8.61 0 13.951 4.16 13.951 13.578 0 10.452-5.928 15.387-14.992 15.319zM63.68 118.391h9.913l-.551-27.356h-8.809l-.553 27.356zM136.621 74.625h-9.906l.545 27.357h8.808l.553-27.357zM68.635 73.912c-3.643 0-6.588 2.942-6.588 6.567 0 3.624 2.945 6.565 6.588 6.565 3.643 0 6.593-2.942 6.593-6.565 0-3.625-2.95-6.567-6.593-6.567zM109.309 110.277c-.781.321-2.604.578-4.818.578-8.151 0-13.892-5.254-13.892-14.345 0-9.478 6.327-14.154 14.603-14.154 4.83 0 7.754.78 10.174 1.883l.744-8.51c-2.393-.804-6.178-1.56-10.85-1.56-14.402 0-25.029 8.314-25.096 22.861 0 6.426 2.214 12.141 6.192 15.975 4.039 3.829 9.839 5.84 17.856 5.84 5.809 0 11.604-1.429 14.668-2.464V92.647h-9.582v17.63h.001zM167.648 110.146c-8.797 0-14.012-5.354-14.012-14.118 0-9.804 6.125-13.998 13.947-13.998 3.588 0 6.387.78 8.344 1.627l.74-8.356c-2.07-.732-5.381-1.388-9.477-1.388-13.293 0-23.98 7.701-23.98 22.631 0 12.536 7.814 21.848 23.006 21.848h9.756l8.279-8.245h-16.603v-.001zM131.668 105.718c-3.641 0-6.59 2.938-6.59 6.561 0 3.628 2.949 6.566 6.59 6.566 3.639 0 6.592-2.938 6.592-6.566 0-3.624-2.953-6.561-6.592-6.561z"/>
  </g>
</svg>
<h1 className="text-3xl font-bold tracking-tight">
              Create your account
            </h1>
            <p className="text-lg text-gray-500">
              Already have an account?{' '}
              <Link
                to="/"
                className="font-medium text-indigo-600 hover:text-indigo-500 text-lg hover:underline hover:underline-offset-4"
                >
                Sign in
              </Link>
            </p>
        </div>
          </div>

          {message && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    {message}
                  </h3>
                </div>
              </div>
            </div>
          )}

          <form className="space-y-6" onSubmit={formik.handleSubmit}>
            <div className="space-y-4">
              <div className="relative">
                <UserIcon className="absolute left-3 top-4 h-5 w-5 text-gray-400" />
                <input
                  id="firstname"
                  name="firstname"
                  type="text"
                  autoComplete="firstname"
                  required
                  className="appearance-none block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="first name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstname}
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
                )}
              </div>
              <div className="relative">
                <UserIcon className="absolute left-3 top-4 h-5 w-5 text-gray-400" />
                <input
                  id="lastname"
                  name="lastname"
                  type="text"
                  autoComplete="lastname"
                  required
                  className="appearance-none block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="last name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastname}
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
                )}
              </div>
              <div className="relative">
                <MailIcon className="absolute left-3 top-4 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Email address"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
                )}
              </div>
              <div className="relative">
                <MailIcon className="absolute left-3 top-4 h-5 w-5 text-gray-400" />
                <input
                  id="mobile"
                  name="mobile"
                  type="string"
                  autoComplete="mobile"
                  required
                  className="appearance-none block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="mobile"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.mobile}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
                )}
              </div>
              <div className="relative">
                <LockIcon className="absolute left-3 top-4 h-5 w-5 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password && (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
                )}
              </div>
             
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                required
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                I agree to the{' '}
                <a href="#" className="text-indigo-600 hover:text-indigo-500">
                  Terms
                </a>{' '}
                and{' '}
                <a href="#" className="text-indigo-600 hover:text-indigo-500">
                  Privacy Policy
                </a>
              </label>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700"
            >
              Sign up
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="px-2 bg-white text-gray-500">
                Or sign up with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              Google
            </button>
            <button
              type="button"
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup

