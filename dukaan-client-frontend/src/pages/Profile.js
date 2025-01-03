import React, { useState } from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import Container from '../components/Container'
import {useFormik} from 'formik'
import * as yup from 'yup'
import { useDispatch } from 'react-redux'
import { updateUser } from '../features/user/userSlice'
import {FiEdit} from 'react-icons/fi'
const profileSchema = yup.object({
    firstname: yup.string().required('First Name is required'),
  lastname: yup.string().required('Last Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  mobile: yup.string().required('Mobile is required'), 
})

const Profile = () => {
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('user'));
    const [edit,setEdit]= useState(true)
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
          firstname: user?.firstname,
          lastname: user?.lastname,
          email:  user?.email,
          mobile: user?.mobile,
        },

        validationSchema: profileSchema,
        onSubmit: (values) => {
            dispatch(updateUser(values))
            setEdit(true)
        }
      })
  return (
<>
<BreadCrumb title="My Profile"/>
<Meta title={"My Profile"}/>
<Container class1= 'cart-wrapper home-wrapper-2 py-5'>
    <div className="row">
      <div className="col-12">
        <div className="d-flex justify-content-between align-items-center">
          <h3>My Profile</h3>
          <button className="btn fs-3" onClick={()=>setEdit(!edit)}><FiEdit/></button>

        </div>
      </div>
        <div className="col-12">
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group">
          <label for="firstname">First Name</label>
    <input type="text"
     className="form-control" id="firstname" aria-describedby="firstnamehelp" placeholder="Enter First Name" disabled={edit}
    value={formik.values.firstname}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
     ></input>
     <div className="errors">{
      formik.touched.firstname && formik.errors.firstname ? formik.errors.firstname : null
      }</div>
            </div>  
            <div className="form-group">
          <label for="lastname">Last Name</label>
    <input type="text" className="form-control" id="lastname" aria-describedby="lastnamehelp" placeholder="Enter Last Name" disabled={edit}
    value={formik.values.lastname}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    ></input>
    <div className="errors">{
      formik.touched.lastname && formik.errors.lastname ? formik.errors.lastname : null
      }
      </div>
            </div>  
  <div className="form-group">
    <label for="emailaddress">Email address</label>
    <input type="email" className="form-control" id="emailaddress" aria-describedby="emailHelp" placeholder="Enter Your Email" disabled={edit}
    value={formik.values.email}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    ></input>
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
    <div className="errors">{
      formik.touched.email && formik.errors.email ? formik.errors.email : null
      }</div>

  </div>
  <div className="form-group">
    <label for="mobileno">Email address</label>
    <input type="number" className="form-control" id="mobileno" aria-describedby="mobileHelp" placeholder="Enter Your Phone No" disabled={edit}
    value={formik.values.mobile}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    ></input>
    <small id="mobileHelp" className="form-text text-muted">We'll never share your mobile no with anyone else.</small>
    <div className="errors">{
      formik.touched.mobile && formik.errors.mobile ? formik.errors.mobile : null
      }</div>
  </div>
 
 {edit === false &&  <button type="submit" className="btn btn-primary">Save</button>}
</form>
        </div>
    </div>
</Container>
</>
  )
}

export default Profile