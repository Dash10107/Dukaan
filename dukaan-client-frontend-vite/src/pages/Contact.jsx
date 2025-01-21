import React from 'react'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import * as yup from 'yup'
import { AiOutlineHome, AiOutlineMail } from "react-icons/ai"
import { BiPhoneCall, BiInfoCircle } from "react-icons/bi"
import { postQuery } from '../features/contact/contactSlice'

const contactSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  mobile: yup.number()
    .typeError("That doesn't look like a phone number")
    .positive("A phone number can't start with a minus")
    .integer("A phone number can't include a decimal point")
    .min(10, 'A phone number is at least 10 digits')
    .required('A phone number is required'),
  comment: yup.string().required('Comments is required'),
})

const Contact = () => {
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      mobile: '',
      comment: '',
    },
    validationSchema: contactSchema,
    onSubmit: (values) => {
      dispatch(postQuery(values))
    },
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Contact Us</h1>
      
      <div className="mb-12">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3773.1354317430155!2d72.81443708528032!3d18.969625336351157!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce6e893065bd%3A0x9879ebcd3ef31652!2sMumbai%20Central!5e0!3m2!1sen!2sin!4v1722609541963!5m2!1sen!2sin"
          height="450"
          className="w-full border-0 rounded-lg shadow-md"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title='Location Map'
        ></iframe>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Send us a message</h2>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Name"
                name='name'
                value={formik.values.name}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
              )}
            </div>

            <div>
              <input
                type="email"
                placeholder="Email"
                name='email'
                value={formik.values.email}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
              )}
            </div>

            <div>
              <input
                type="text"
                placeholder="Mobile Number"
                name='mobile'
                value={formik.values.mobile}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
              />
              {formik.touched.mobile && formik.errors.mobile && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.mobile}</p>
              )}
            </div>

            <div>
              <textarea
                placeholder="Your message"
                name="comment"
                rows={4}
                value={formik.values.comment}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
              ></textarea>
              {formik.touched.comment && formik.errors.comment && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.comment}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-black hover:transition-all hover:duration-300 hover:scale-105 active:scale-95"
            >
              Submit
            </button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Get in touch with us</h2>
          <ul className="space-y-4">
            <li className="flex items-start space-x-3">
              <AiOutlineHome className="text-xl text-gray-600 mt-1" />
              <address className="not-italic">
                Mumbai Central, Nathani Heights Commercial, B'Wing, Shop no 57 Ground Floor, Mumbai Central, Mumbai, Maharashtra 400008
              </address>
            </li>
            <li className="flex items-center space-x-3">
              <BiPhoneCall className="text-xl text-gray-600" />
              <a href="tel:+91 7977113766" className="hover:underline">+91 7977113766</a>
            </li>
            <li className="flex items-center space-x-3">
              <AiOutlineMail className="text-xl text-gray-600" />
              <a href="mailto:dakshcjain@gmail.com" className="hover:underline">virustechhacks@gmail.com</a>
            </li>
            <li className="flex items-center space-x-3">
              <BiInfoCircle className="text-xl text-gray-600" />
              <p>Monday – Friday 10 AM – 8 PM</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Contact