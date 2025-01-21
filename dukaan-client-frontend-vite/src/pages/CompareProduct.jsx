import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IoMdClose } from "react-icons/io"
import { removeProductFromCompare } from '../features/products/productSlice'
import Meta from '../components/Meta'
import BreadCrumb from '../components/BreadCrumb'
import Container from '../components/Container'
import Color from '../components/Color'

const CompareProduct = () => {
  const dispatch = useDispatch()
  const compareProduct = useSelector(state => state?.product?.compareProduct)
  const [color, setColor] = useState('')

  return (
    <>
      <Meta title={"Compare Products"} />
      <BreadCrumb title="Compare Products" />
      <Container class1="py-10 bg-gray-100">
        <div className="max-w-[80%] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Compare Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {compareProduct && compareProduct?.map((product) => (
              <div key={product?._id} className="bg-white rounded-lg shadow-md overflow-hidden p-2">
                <div className="relative">
                  <button
                    onClick={() => { dispatch(removeProductFromCompare(product?._id)) }}
                    className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200"
                  >
                    <IoMdClose className="text-gray-600 w-5 h-5" />
                  </button>
                  <img
                    src={product?.images.length > 0 ? product?.images[0]?.url : "../images/watch.jpg"}
                    alt={product?.title}
                    className="w-full h-48 object-cover object-center"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{product?.title}</h3>
                  <p className="text-2xl font-bold text-blue-600 mb-4">${product?.price}</p>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Brand:</span>
                      <span className="font-medium">{product?.brand}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-medium">{product?.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Availability:</span>
                      <span className="font-medium text-green-600">In Stock</span>
                    </div>
                    <div>
                      <span className="text-gray-600 block mb-2">Color:</span>
                      <ul className="flex space-x-2">
                        {product?.color && product?.color.map((colorItem, index) => (
                          <Color key={index} colorName={colorItem} setColor={setColor} />
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </>
  )
}

export default CompareProduct