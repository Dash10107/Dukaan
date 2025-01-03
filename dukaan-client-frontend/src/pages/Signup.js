import React from 'react'
import Meta from '../components/Meta'
import BreadCrumb from '../components/BreadCrumb'
import Container from '../components/Container'
import CustomInput from '../components/CustomInput'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useDispatch } from 'react-redux'
import { registerUser } from '../features/user/userSlice'
import { useNavigate } from 'react-router-dom'


const signUpSchema = yup.object().shape({
  firstname: yup.string().required('First Name is required'),
  lastname: yup.string().required('Last Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  mobile: yup.string().required('Mobile is required'),
  password: yup.string().required('Password is required')
})

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      mobile: '',
      password: ''
    },
    validationSchema: signUpSchema,
    onSubmit: values => {
     const result =  dispatch(registerUser(values))
     if (registerUser.fulfilled.match(result)) {
      navigate('/login'); // Navigate to home on successful login
  }
    }
  })

  return (
    <>
      <Meta title={"Sign Up"} />
      <BreadCrumb title="Sign Up" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Sign Up</h3>
              <form onSubmit={formik.handleSubmit} action="" className="d-flex flex-column gap-15">
                <CustomInput type="text" name="firstname" placeholder="First Name" value={formik.values.firstname} onChange={formik.handleChange("firstname")}
                onBlur={formik.handleBlur("firstname")} />
                
                <div className="error">
                  {formik.touched.firstname && formik.errors.firstname ? <p>{formik.errors.firstname}</p> : null}
                </div>

                <CustomInput type="text" name="lastname" placeholder="Last Name" value={formik.values.lastname} onChange={formik.handleChange("lastname")} 
                onBlur={formik.handleBlur("lastname")}/>
                
                <div className="error">
                  {formik.touched.firstname && formik.errors.firstname ? <p>{formik.errors.firstname}</p> : null}
                </div>
                
                <CustomInput type="email" name="email" placeholder="Email" value={formik.values.email} onChange={formik.handleChange("email")} 
                onBlur={formik.handleBlur("email")} />
                
                <div className="error">
                  {formik.touched.email && formik.errors.email ? <p>{formik.errors.email}</p> : null}
                </div>
                
                <CustomInput
                  type="tel"
                  name="mobile"
                  placeholder="Mobile Number"
                  value={formik.values.mobile}
                  onChange={formik.handleChange("mobile")}
                  onBlur={formik.handleBlur("mobile")}
                />
                
                <div className="error">
                  {formik.touched.mobile && formik.errors.mobile ? <p>{formik.errors.mobile}</p> : null}
                </div>
                
                <CustomInput
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange("password")}
                  onBlur={formik.handleBlur("password")}
                />
                <div className="error">
                  {formik.touched.password && formik.errors.password ? <p>{formik.errors.password}</p> : null}
                </div>
                <div>
                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                    <button className="button border-0">Sign Up</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default Signup