import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { AiOutlineDelete, AiOutlineShopping } from "react-icons/ai"
import { FiShoppingCart } from "react-icons/fi"
import { emptyCart, getCart, removeProductFromCart, updateProductQuantity } from "../features/products/productSlice"
import Meta from "../components/Meta"
import BreadCrumb from "../components/BreadCrumb"
import Container from "../components/Container"
import Color from "../components/Color"

const Cart = () => {
  const dispatch = useDispatch()
  const [quantities, setQuantities] = useState({})
  const [total, setTotal] = useState(0)
  const cart = useSelector((state) => state?.product?.cart || [])

  useEffect(() => {
    dispatch(getCart())
  }, [dispatch])

  useEffect(() => {
    const total = cart?.reduce((accumulator, item) => accumulator + item?.quantity * item?.price, 0)
    setTotal(total)
  }, [cart])

  const removeProductFunc = (productId) => {
    dispatch(removeProductFromCart(productId))
    setTimeout(() => {
      dispatch(getCart())
    }, 300)
  }

  const emptyCartFunc = () => {
    dispatch(emptyCart())
    setTimeout(() => {
      dispatch(getCart())
    }, 300)
  }

  const handleQuantityChange = (productId, newQuantity) => {
    setQuantities((prevState) => ({
      ...prevState,
      [productId]: newQuantity,
    }))
  }

  const handleQuantityBlur = (productId) => {
    const newQuantity = quantities[productId]
    if (newQuantity && newQuantity > 0) {
      dispatch(updateProductQuantity({ productId, newQuantity }))
      setTimeout(() => {
        dispatch(getCart())
      }, 300)
    }
  }

  return (
    <>
      <Meta title="Cart" />
      <BreadCrumb title="Cart" />
      <Container class1="cart-wrapper py-8">
        <div className="max-w-7xl mx-auto">
          {!cart || cart.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-lg">
              <FiShoppingCart className="mx-auto h-16 w-16 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">Your cart is empty</h3>
              <p className="mt-2 text-sm text-gray-500">Start shopping to add items to your cart</p>
              <Link
                to="/product"
                className="mt-6 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-black hover:scale-105 active:scale-95 hover:duration-300 hover:transition-all"
              >
                <AiOutlineShopping className="mr-2 h-5 w-5" />
                Continue Shopping
              </Link>
            </div>
          ) : (
            <>
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                  <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-3">
                      <h4 className="text-sm font-medium text-gray-900">Product</h4>
                    </div>
                    <div className="col-span-1 text-center">
                      <h4 className="text-sm font-medium text-gray-900">Price</h4>
                    </div>
                    <div className="col-span-1 text-center">
                      <h4 className="text-sm font-medium text-gray-900">Quantity</h4>
                    </div>
                    <div className="col-span-1 text-right">
                      <h4 className="text-sm font-medium text-gray-900">Total</h4>
                    </div>
                  </div>
                </div>

                <div className="divide-y divide-gray-200">
                  {cart.map((product) => (
                    <div key={product._id} className="px-6 py-4">
                      <div className="grid grid-cols-6 gap-4 items-center">
                        <div className="col-span-3 flex items-center space-x-4">
                          <img
                            src="../images/watch.jpg"
                            alt={product?.productId?.title}
                            className="h-20 w-20 rounded-lg object-cover"
                          />
                          <div>
                            <h3 className="text-sm font-medium text-gray-900">{product?.productId?.title}</h3>
                            <div className="mt-1 flex items-center space-x-2">
                              <span className="text-sm text-gray-500">Color:</span>
                              <Color colorName={product?.color} />
                            </div>
                          </div>
                        </div>

                        <div className="col-span-1 text-center">
                          <span className="text-sm font-medium text-gray-900">₹{product?.price}</span>
                        </div>

                        <div className="col-span-1 flex items-center justify-center space-x-3">
                          <input
                            type="number"
                            min={1}
                            max={10}
                            value={quantities[product?._id] || product?.quantity}
                            onChange={(e) => handleQuantityChange(product?._id, e.target.value)}
                            onBlur={() => handleQuantityBlur(product?._id)}
                            className="w-16 rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                          />
                          <button
                            onClick={() => removeProductFunc(product?._id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <AiOutlineDelete className="h-5 w-5" />
                          </button>
                        </div>

                        <div className="col-span-1 text-right">
                          <span className="text-sm font-medium text-gray-900">
                            ₹{product?.quantity * product?.price}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4">
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-4">
                      <Link
                        to="/product"
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                      >
                        <AiOutlineShopping className="mr-2 h-5 w-5" />
                        Continue Shopping
                      </Link>
                      <button
                        onClick={emptyCartFunc}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                      >
                        <AiOutlineDelete className="mr-2 h-5 w-5" />
                        Empty Cart
                      </button>
                    </div>

                    <div className="text-right">
                      <div className="text-lg font-medium text-gray-900">Subtotal: ₹{total}</div>
                      <p className="mt-1 text-sm text-gray-500">Taxes and shipping calculated at checkout</p>
                      <Link
                        to="/checkout"
                        className="mt-4 inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-purple-600 hover:bg-purple-700"
                      >
                        Proceed to Checkout
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </Container>
    </>
  )
}

export default Cart

