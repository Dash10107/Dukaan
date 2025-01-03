import React, { useState } from 'react'
import Meta from '../components/Meta'
import BreadCrumb from '../components/BreadCrumb'
import Container from '../components/Container'
import Color from '../components/Color'
import { useDispatch, useSelector } from 'react-redux'
import { IoMdClose } from "react-icons/io";
import { removeProductFromCompare } from '../features/products/productSlice'
const CompareProduct = () => {
  const dispatch = useDispatch()
  const compareProduct = useSelector(state=>state?.product?.compareProduct)
  const [color,setColor] = useState('')

  return (
    <> <Meta title={"Compare Products"} />
    <BreadCrumb title="Compare Products" />
    <Container class1="compare-product-wrapper py-5 home-wrapper-2">
      <div className="row">
        {compareProduct && compareProduct?.map((product)=>{
          return (
            <div className="col-3" key={product?._id}>
            <div className="compare-product-card position-relative">
            <IoMdClose onClick={()=>{dispatch(removeProductFromCompare(product?._id))}} className="position-absolute cross img-fluid"/>
              <div className="product-card-image">
                <img src={product?.images.length > 0 ? product?.images[0]?.url: "../images/watch.jpg"} alt="watch" width={100}/>
              </div>
              <div className="compare-product-details">
                <h5 className="title">
                  {product?.title}
                </h5>
                <h6 className="price mb-3 mt-3">$ {product?.price}</h6>
  
                <div>
                  <div className="product-detail">
                    <h5>Brand:</h5>
                    <p>{product?.brand}</p>
                  </div>
                  <div className="product-detail">
                    <h5>Type:</h5>
                    <p>{product?.category}</p>
                  </div>
                  <div className="product-detail">
                    <h5>Availablity:</h5>
                    <p>In Stock</p>
                  </div>
                  <div className="product-detail">
                    <h5>Color:</h5>
                    <ul className='colors'>
                    {product?.color && product?.color.map((color,index)=>(
                     <Color key={index} colorName={color} setColor={setColor}/>
                    ))}
                    </ul>
                  </div>
                  {/* <div className="product-detail">
                    <h5>Size:</h5>
                    <div className="d-flex gap-10">
                      <p>S</p>
                      <p>M</p>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
          )
        })}


      </div>
    </Container>
  </>
  )
}

export default CompareProduct