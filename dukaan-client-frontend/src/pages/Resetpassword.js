import React from 'react'
import Meta from '../components/Meta'
import BreadCrumb from '../components/BreadCrumb'
import Container from '../components/Container'
import CustomInput from '../components/CustomInput'
import { useNavigate, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useDispatch} from 'react-redux'
import { resetPassword } from '../features/user/userSlice'


const resetPasswordSchema = yup.object().shape({
  password: yup.string().required('Password is required'),
  confpassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
})

const Resetpassword = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {token } = useParams();
  const formik = useFormik({
    initialValues: {
      password: '',
      confpassword: ''
    },
    validationSchema: resetPasswordSchema,
    onSubmit:(values) => {
      dispatch(resetPassword({password:values.password,confpassword:values.confpassword,token:token}));
      navigate('/login')
    }
  })
  return (
    <>
      <Meta title={"Reset Password"} />
      <BreadCrumb title="Reset Password" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Reset Password</h3>
              <form 
              onSubmit={formik.handleSubmit}
              action="" className="d-flex flex-column gap-15">
                <CustomInput
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange("password")}
                  onBlur={formik.handleBlur("password")}
                />
                <div className="text-danger">
                  {formik.touched.password && formik.errors.password ? formik.errors.password : ""}
                </div>
                <CustomInput
                  type="password"
                  name="confpassword"
                  placeholder="Confirm Password"
                  value={formik.values.confpassword}
                  onChange={formik.handleChange("confpassword")}
                  onBlur={formik.handleBlur("confpassword")}
                />
                <div className="text-danger">
                  {formik.touched.confpassword && formik.errors.confpassword ? formik.errors.confpassword : ""}
                  </div>
                <div>
                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                    <button className="button border-0">Ok</button>
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

export default Resetpassword