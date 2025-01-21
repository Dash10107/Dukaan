import React, { useEffect, useState } from 'react'
import Container from '../components/Container'
import { Link } from 'react-router-dom'
import { BiArrowBack } from "react-icons/bi";
import {useDispatch, useSelector} from "react-redux"
import {useFormik} from "formik";
import * as yup from "yup";
import axios from "axios";
import { Country, State, City }  from 'country-state-city';
import { base_url, config } from '../utils/axiosConfig';
import { createOrder } from '../features/products/productSlice';

const shippingSchema = yup.object({
  name: yup.string().required("Name is required"),
  address: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("City is required"),
  pincode: yup.string().required("Postal code is required").matches(/^[0-9]+$/, "Postal code must be numeric"),
  country: yup.string().required("Country is required"),
  other: yup.string().required("This field is required")
});
const Checkout = () => {
  const dispatch = useDispatch();
  const cart = useSelector(state=>state.product?.cart);
  const [total,setTotal] = useState(0);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const countryCode = 'IN';
 const [shippingInfo, setShippingInfo] = useState({});
  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      name: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      country: '',
      other: ''
    },
    validationSchema: shippingSchema,
    onSubmit: values => {
      // Handle form submission
      // const orderItems = cart?.map(item => ({
      //   productId: item.productId._id,
      //   quantity: item.quantity,
      //   price: item.price,
      //   color: item.color,
      // }));
      
      setShippingInfo(values);
    
      },
  });

  useEffect(() => {
    // Fetch states when component mounts
    const statesOfCountry = State.getStatesOfCountry(countryCode);
    setStates(statesOfCountry);
  }, [countryCode]);

  useEffect(() => {
    const selectedState = states?.find(state => state.name === formik.values.state);
    // Fetch cities when state changes
    const citiesOfState = City.getCitiesOfState(countryCode, selectedState?.isoCode);
    setCities(citiesOfState);
  }, [formik.values.state,states]);


  useEffect(()=>{


    const total  = cart?.reduce(
    (accumulator, item) => accumulator + (item?.quantity*item?.price),0
  );
  
  setTotal(total);
  
  },[cart])

  const loadScript = async(src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  const checkoutHandler = async () => {
    console.log('Checkout handler',process.env.REACT_APP_RAZORPAY_KEY);
   const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
    if(!res){
      alert('Razorpay SDK failed to load. Are you online?')
      return
    }
    const result = await axios.post(`${base_url}/user/order/checkout`,{amount:total+5},config);
    if(!result){
      alert('Server error. Are you online?')
      return
    }
    const {amount, id: order_id, currency} = result.data.order;

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
      amount: amount,
      currency: currency,
      name: "Daksh Jain.",
      description: "Test Transaction",
      order_id: order_id,
      handler: async function (response) {
          const data = {
              orderCreationId: order_id,
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
          };

          await axios.post(`${base_url}/user/order/paymentVerification`, data,config);
          
          const orderItems = cart?.map(item => ({
            productId: item.productId._id,
            quantity: item.quantity,
            price: item.price,
            color: item.color,
          }));

          // Dispatch createOrder action after payment verification
          dispatch(createOrder({
            totalPrice: total,
            totalPriceAfterDiscount: total,
            shippingInfo: shippingInfo,
            paymentInfo: {
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
            },
            orderItems: orderItems
          }));

          
      },
      prefill: {
          name: "Daksh Jain",
          email: "dakshcjain@gmail.com",
          contact: "7977113766",
      },
      notes: {
          address: "Digic Corporate Office",
      },
      theme: {
          color: "#61dafb",
      },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();

  }

  return (
    <>
      <Container class1="checkout-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-7">
            <div className="checkout-left-data">
              <h3 className="website-name">Dev Corner</h3>
              <nav
                style={{ "--bs-breadcrumb-divider": ">" }}
                aria-label="breadcrumb"
              >
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link className="text-dark total-price" to="/cart">
                      Cart
                    </Link>
                  </li>
                  &nbsp; /&nbsp;
                  <li
                    className="breadcrumb-ite total-price active"
                    aria-current="page"
                  >
                    Information
                  </li>
                  &nbsp; /
                  <li className="breadcrumb-item total-price active">
                    Shipping
                  </li>
                  &nbsp; /
                  <li
                    className="breadcrumb-item total-price active"
                    aria-current="page"
                  >
                    Payment
                  </li>
                </ol>
              </nav>
              <h4 className="title total">Contact Information</h4>
              <p className="user-details total">
                Navdeep Dahiya (monud0232@gmail.com)
              </p>
              <h4 className="mb-3">Shipping Address</h4>
              <form
                onSubmit={formik.handleSubmit}
                action=""
                className="d-flex gap-15 flex-wrap justify-content-between"
              >
                <div className="w-100">
                  <select name="country"
                    onChange={formik.handleChange}
                    value={formik.values.country}
                    onBlur={formik.handleBlur}

                   className="form-control form-select" id="">
                    <option value="" selected disabled>
                      Select Country
                    </option>
                    <option
                    value="India"
                     >India</option>
                  </select>
                  <div className="errors">
                    {formik.touched.country && formik.errors.country}
                  </div>
                </div>
                <div className="w-100">
                  <input
                    type="text"
                    name='name'
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    onBlur={formik.handleBlur}
                    placeholder="Full Name"
                    className="form-control"
                  />
                  <div className="errors">
                    {formik.touched.name && formik.errors.name}
                    </div>
                 </div>


                <div className="w-100">
                  <input
                    type="text"
                    name='address'
                    onChange={formik.handleChange}
                    value={formik.values.address}
                    onBlur={formik.handleBlur}
                    placeholder="Address"
                    className="form-control"
                  />
                  <div className="errors">
                    {formik.touched.address && formik.errors.address}
                    </div>
                </div>
                <div className="w-100">
                  <input
                    type="text"
                    name='other'
                    onChange={formik.handleChange}
                    value={formik.values.other}
                    onBlur={formik.handleBlur}
                    placeholder="Apartment, Suite ,etc"
                    className="form-control"
                  />                 

                </div>

                <div className="flex-grow-1">
                  <select 
                  name="state"
                  value={formik.values.state}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="form-control form-select" id="">
                    <option value="" selected disabled>
                      Select State
                    </option>
                    {
                      states.map((state,index)=>{
                        return(
                          <option key={index} value={state.name}>{state.name}</option>
                        )
                      })
                    }
                  </select>
                  <div className="errors">
                    {formik.touched.state && formik.errors.state}
                    </div>
                </div>
                <div className="flex-grow-1">
                <select
                    name="city"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="form-control form-select"
                  >
                    <option value="" disabled>Select City</option>
                    {cities.map((city) => (
                      <option key={city.name} value={city.name}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                  <div className="errors">
                    {formik.touched.city && formik.errors.city}
                    </div>
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    name='pincode'
                    onChange={formik.handleChange}
                    value={formik.values.pincode}
                    onBlur={formik.handleBlur}
                    placeholder="Zipcode"
                    className="form-control"
                  />
                  <div className="errors">
                    {formik.touched.pincode && formik.errors.pincode}
                    </div>
                </div>
                <div className="w-100">
                  <div className="d-flex justify-content-between align-items-center">
                    <Link to="/cart" className="text-dark">
                      <BiArrowBack className="me-2" />
                      Return to Cart
                    </Link>
                    <Link to="/cart" className="button">
                      Continue to Shipping
                    </Link>
                    <button type="submit" onClick={checkoutHandler} className="button">
                      Place Order
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-5">
            <div className="border-bottom py-4">
              {
                cart && cart?.map((item,index)=>{
                  return(
                    <div className="d-flex gap-10 mb-2 align-align-items-center" key={index}>
                    <div className="w-75 d-flex gap-10">
                      <div className="w-25 position-relative">
                        <span
                          style={{ top: "-10px", right: "2px" }}
                          className="badge bg-secondary text-white rounded-circle p-2 position-absolute"
                        >
                          {item?.quantity}
                        </span>
                        <img className="img-fluid" width={100} height={100} src={item?.productId?.images?.length > 0 ? item?.productId?.images[0]?.url: "../images/watch.jpg"} alt="product" />
                      </div>
                      <div>
                        <h5 className="total-price">{item?.productId?.title}</h5>
                        <p className="total-price">s / {item?.color}</p>
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <h5 className="total">$ {item?.price * item?.quantity}</h5>
                    </div>
                  </div>
                  )
                })
              }

            </div>
            <div className="border-bottom py-4">
              <div className="d-flex justify-content-between align-items-center">
                <p className="total">Subtotal</p>
                <p className="total-price">$ {total}</p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0 total">Shipping</p>
                <p className="mb-0 total-price">$ 5</p>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center border-bootom py-4">
              <h4 className="total">Total</h4>
              <h5 className="total-price">$ {total>0?total+5:0}</h5>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default Checkout