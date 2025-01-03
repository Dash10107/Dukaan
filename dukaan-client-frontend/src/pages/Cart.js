import React, { useEffect, useState } from 'react'
import Meta from '../components/Meta'
import BreadCrumb from '../components/BreadCrumb'
import Container from '../components/Container'
import { AiFillDelete } from "react-icons/ai";
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { emptyCart, getCart, removeProductFromCart, updateProductQuantity } from '../features/products/productSlice';
import Color from '../components/Color';

const Cart = () => {

  const dispatch = useDispatch();
  const [quantities, setQuantities] = useState({});
  const [total,setTotal] = useState(0);
useEffect(()=>{ dispatch(getCart());},[dispatch])



const removeProductFunc = (productId)=>{
 dispatch(removeProductFromCart(productId));
 setTimeout(()=>{
    dispatch(getCart());
  }
  ,300)
}

const emptyCartFunc = ()=>{
  dispatch(emptyCart());
  setTimeout(()=>{
     dispatch(getCart());
   }
   ,300)
 }
 


const handleQuantityChange = (productId, newQuantity) => {
  setQuantities(prevState => ({
    ...prevState,
    [productId]: newQuantity,
  }));
};

const handleQuantityBlur = (productId) => {
  const newQuantity = quantities[productId];
  if (newQuantity && newQuantity > 0) {
    dispatch(updateProductQuantity({ productId, newQuantity }));
    setTimeout(() => {
      dispatch(getCart());
    }, 300);
  }
};



const cart = useSelector((state) => state?.product?.cart || []);
useEffect(()=>{


  const total  = cart?.reduce(
  (accumulator, item) => accumulator + (item?.quantity*item?.price),0
);

setTotal(total);

},[cart])

return (
    <>
    <Meta title={"Cart"} />
    <BreadCrumb title="Cart" />
    <Container class1="cart-wrapper home-wrapper-2 py-5">
      <div className="row">
{
  !cart && <div className="col-12">
  <h4 className="text-center">No Product In Cart</h4>
</div>

}
{
 cart &&  cart?.map((product)=>(
    <div className="col-12" key={product._id}>
    <div className="cart-header py-3 d-flex justify-content-between align-items-center">
    <h4 className="cart-col-1">Product</h4>
    <h4 className="cart-col-2">Price</h4>
    <h4 className="cart-col-3">Quantity</h4>
    <h4 className="cart-col-4">Total</h4>
  </div>
            <div className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center">
            <div className="cart-col-1 gap-15 d-flex align-items-center">
              <div className="w-25">
                <img src="../images/watch.jpg" className="img-fluid" alt="product" />
              </div>
              <div className="w-75">
                <p>{product?.productId?.title}</p>
                {/* <p>Size: {product?.size}</p> */}
                <p className='d-flex gap-10'>Color: <ul className='colors ps-0'><Color colorName={product?.color}/></ul></p>
              </div>
            </div>
            <div className="cart-col-2">
              <h5 className="price">{product?.price}</h5>
            </div>
            <div className="cart-col-3 d-flex align-items-center gap-15">
              <div>
                <input
                  className="form-control"
                  type="number"
                  name="quantity"
                  min={1}
                  max={10}
                  value={quantities[product?._id] || product?.quantity}
                  onChange={(e)=>handleQuantityChange(product?._id,e.target.value)}
                  onBlur={()=>handleQuantityBlur(product?._id)}
                />
              </div>
              <div 
              className='cursor-pointer'
              onClick={()=>removeProductFunc(product?._id)}
              >
                <AiFillDelete className="text-danger " />
              </div>
            </div>
            <div className="cart-col-4">
              <h5 className="price"> Rs { product?.quantity * product?.price}</h5>
            </div>
          </div>
                  </div>
  ))
}


        <div className="col-12 py-2 mt-4">
          <div className="d-flex justify-content-between align-items-baseline">
            <Link to="/product" className="button">
              Continue To Shopping
            </Link>
            <button className="button btn" onClick={emptyCartFunc} >
              Empty  Cart
            </button>
            <div className="d-flex flex-column align-items-end">
              <h4>SubTotal: {total}</h4>
              <p>Taxes and shipping calculated at checkout</p>
              <Link to="/checkout" className="button">
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Container>
  </>
  )
}

export default Cart