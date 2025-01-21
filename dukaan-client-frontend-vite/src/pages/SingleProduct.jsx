import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as yup from 'yup'
import ReactStars from "react-rating-stars-component"
import { TbGitCompare } from "react-icons/tb"
import { AiOutlineHeart, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai"
import { toast } from 'react-toastify'

import Meta from '../components/Meta'
import BreadCrumb from '../components/BreadCrumb'
import Container from '../components/Container'
import Color from '../components/Color'
import SpecialProduct from '../components/SpecialProduct'
import { addProductToCompare, addToCart, addToWishlist, getAProducts, getAllProducts, rateProduct } from '../features/products/productSlice'

const reviewSchema = yup.object().shape({
  prodId: yup.string().required('Product id is required'),
  star: yup.number().required('Rating is required'),
  comment: yup.string().required('Comment is required')
})

const SingleProduct = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams()
  const [color, setColor] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [alreadyAdded, setAlreadyAdded] = useState(false)

  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
  
  useEffect(() => {
    dispatch(getAProducts(id))
    dispatch(getAllProducts())
  }, [])

  const product = useSelector(state => state?.product?.singleProduct)
  const cart = useSelector(state => state?.product?.cart)
  const products = useSelector(state => state?.product?.products)

  useEffect(() => {
    setAlreadyAdded(cart?.find(item => item.productId?._id === product?._id))
  }, [cart, product])

  const formik = useFormik({
    initialValues: {
      prodId: id,
      star: 4,
      comment: ''
    },
    validationSchema: reviewSchema,
    onSubmit: (values) => {
      dispatch(rateProduct(values))
    },
  })

  const addToCartFunc = () => {
    if (alreadyAdded) {
      navigate('/cart')
      return
    }
    if (quantity === 0) {
      toast.warning("Please Choose Item Quantity")
      return
    }
    if (color === "") {
      toast.warning("Please Choose Item Color")
      return
    }
    
    dispatch(addToCart({
      productId: product?._id,
      quantity,
      color,
      price: product?.price
    }))
    navigate('/cart')
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success("Link copied to clipboard!")
  }

  return (
    <>
      <Meta title={product?.title} />
      <BreadCrumb title={product?.title} />
      
      <Container class1="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
            {/* Image gallery */}
            <div className="flex flex-col">
              <div className="w-full aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={product?.images?.[selectedImage]?.url || "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg"}
                  alt={product?.title}
                  className="w-full h-full object-center object-cover"
                />
              </div>
              <div className="mt-4 grid grid-cols-4 gap-4">
                {product?.images?.map((image, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative rounded-lg overflow-hidden ${
                      selectedImage === i ? 'ring-2 ring-primary' : 'ring-1 ring-gray-200'
                    }`}
                  >
                    <img
                      src={image.url || "/placeholder.svg"}
                      alt={`Product ${i + 1}`}
                      className="w-full h-full object-center object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product info */}
            <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product?.title}</h1>
              
              <div className="mt-3">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl tracking-tight text-gray-900">${product?.price}</p>
              </div>

              <div className="mt-3">
                <div className="flex items-center">
                  <ReactStars
                    count={5}
                    size={24}
                    value={product?.totalrating || 0}
                    edit={false}
                    activeColor="#ffd700"
                  />
                  <p className="ml-2 text-sm text-gray-500">({product?.ratings?.length} reviews)</p>
                </div>
              </div>

              <div className="mt-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Type</h3>
                    <p className="mt-1 text-sm text-gray-500">{product?.type}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Brand</h3>
                    <p className="mt-1 text-sm text-gray-500">{product?.brand}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Category</h3>
                    <p className="mt-1 text-sm text-gray-500">{product?.category}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Size</h3>
                </div>

                <div className="grid grid-cols-4 gap-4 mt-2">
                  {['S', 'M', 'L', 'XL'].map((size) => (
                    <button
                      key={size}
                      className="border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {!alreadyAdded && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-900">Color</h3>
                  <div className="mt-2">
                    <ul className="flex space-x-3">
                      {product?.color?.map((colorName, index) => (
                        <Color key={index} colorName={colorName} setColor={setColor} />
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {!alreadyAdded && (
                <div className="mt-6">
                  <div className="flex items-center">
                    <h3 className="text-sm font-medium text-gray-900 mr-3">Quantity</h3>
                    <div className="flex items-center border rounded-md">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-2 hover:bg-gray-50"
                      >
                        <AiOutlineMinus className="h-4 w-4" />
                      </button>
                      <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        className="w-16 text-center border-x p-2"
                        min="1"
                        max="10"
                      />
                      <button
                        onClick={() => setQuantity(Math.min(10, quantity + 1))}
                        className="p-2 hover:bg-gray-50"
                      >
                        <AiOutlinePlus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-8 flex flex-col space-y-4">
                <button
                  onClick={addToCartFunc}
                  className="flex-1 bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  {alreadyAdded ? "Go to Cart" : "Add to Cart"}
                </button>
                <button className="flex-1 border border-primary text-primary px-6 py-3 rounded-md hover:bg-gray-50">
                  Buy Now
                </button>
              </div>

              <div className="mt-6 flex items-center space-x-4">
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    dispatch(addProductToCompare(product))
                    navigate("/compareproduct")
                  }}
                  className="flex items-center text-sm text-gray-600 hover:text-gray-900"
                >
                  <TbGitCompare className="h-5 w-5 mr-2" />
                  Compare
                </button>
                <button
                  onClick={() => dispatch(addToWishlist(product?._id))}
                  className="flex items-center text-sm text-gray-600 hover:text-gray-900"
                >
                  <AiOutlineHeart className="h-5 w-5 mr-2" />
                  Add to Wishlist
                </button>
              </div>

              <div className="mt-8 border-t border-gray-200 pt-8">
                <h3 className="text-sm font-medium text-gray-900">Description</h3>
                <div className="mt-4 prose prose-sm text-gray-500">
                  <p>{product?.description}</p>
                </div>
              </div>

              <div className="mt-8 border-t border-gray-200 pt-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">Customer Reviews</h3>
                  <div className="flex items-center">
                    <ReactStars
                      count={5}
                      size={24}
                      value={product?.totalrating || 0}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <p className="ml-2 text-sm text-gray-500">
                      Based on {product?.ratings?.length} reviews
                    </p>
                  </div>
                </div>

                {product?.ratings?.find(rating => rating.postedby?._id === user?._id) === undefined && (
                  <div className="mt-8">
                    <h4 className="text-lg font-medium text-gray-900">Write a Review</h4>
                    <form onSubmit={formik.handleSubmit} className="mt-4 space-y-4">
                      <div>
                        <ReactStars
                          count={5}
                          size={24}
                          value={formik.values.star}
                          onChange={(e) => formik.setFieldValue("star", parseInt(e))}
                          edit={true}
                          activeColor="#ffd700"
                        />
                      </div>
                      <div>
                        <textarea
                          name="comment"
                          rows={4}
                          className="shadow-sm block w-full focus:ring-primary focus:border-primary sm:text-sm border border-gray-300 rounded-md p-2"
                          value={formik.values.comment}
                          onChange={formik.handleChange}
                          placeholder="Write your review here..."
                          
                        />
                      </div>
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                        >
                          Submit Review
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                <div className="mt-8 space-y-6">
                  {product?.ratings?.map((rating, index) => (
                    <div key={index} className="border-b border-gray-200 pb-6">
                      <h4 className="text-sm font-medium text-gray-900">
                        {rating.postedby.firstname} {rating.postedby.lastname}
                      </h4>
                      <div className="mt-2">
                        <ReactStars
                          count={5}
                          size={24}
                          value={rating.star}
                          edit={false}
                          activeColor="#ffd700"
                        />
                      </div>
                      <p className="mt-2 text-sm text-gray-500">{rating.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Popular products */}
          <div className="mt-16 border-t border-gray-200 pt-16">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Popular Products</h2>
            <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
              {products?.slice(0, 4).map((product) => (
                product.tags === "special" ? (
                  <SpecialProduct key={product._id} product={product} />
                ) : null
              ))}
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default SingleProduct