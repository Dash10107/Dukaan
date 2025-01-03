import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { addProductToCompare, addToWishlist } from "../features/products/productSlice";
const ProductCard = (props) => {
  const { grid,product } = props;
  let location = useLocation();
  const dispatch = useDispatch();

  const addToWishlistFunc = (productId) => {
    dispatch(addToWishlist(productId));  
  }

  const addToCompare = (e)=>{
    e.preventDefault();
    dispatch(addProductToCompare(product))
  }




  return (
    <>
      <div
        className={` ${
          location.pathname === "/product" ? `gr-${grid}` : "col-3"
        } `}
      >
        <Link
            to={`/product/${product._id}`}
          className="product-card position-relative"
        >
          <div className="wishlist-icon position-absolute">
            <button className="border-0 bg-transparent" onClick={
              (e)=>{e.preventDefault();e.stopPropagation(); addToWishlistFunc(product?._id)}
            }>
              <img src="../images/wish.svg" alt="wish"  />
            </button>
          </div>
          <div className="product-image">
            {/* {
              product?.images?.map((image,index)=>(
                <img src={image.url} key={index} className="img-fluid  mx-auto" width={160} alt="" />
              ))

            }
              {
                product?.images?.length === 0 && (<> */}

          <img src={ product?.images?.length > 0 ? product?.images[0]?.url :  "../images/watch.jpg"} className="img-fluid  mx-auto" width={160}  alt="" />
          <img src={ product?.images?.length > 0 ? (product?.images[1]?.url ? product?.images[1]?.url  :   product?.images[0]?.url) :  "../images/watch-1.avif"} className="img-fluid  mx-auto" width={160} alt="" />
                
              
          </div>
          <div className="product-details">
            <h6 className="brand">{product.brand}</h6>
            <h5 className="product-title">
            {product.title}
            </h5>
            <ReactStars
              count={5}
              size={24}
              value={product.totalrating}
              edit={false}
              activeColor="#ffd700"
            />
            <p className={`description ${grid === 12 ? "d-block" : "d-none"}`}
            dangerouslySetInnerHTML={{__html:product?.description}}>
            </p>
            <p className="price">{product.price}</p>
          </div>
          <div className="action-bar position-absolute">
            <div className="d-flex flex-column gap-15">
              <button className="border-0 bg-transparent" onClick={addToCompare}>
                <img src="../images/prodcompare.svg" alt="compare" />
              </button>
              <button className="border-0 bg-transparent">
                <img src="../images/view.svg"  alt="view" />
              </button>
              <button className="border-0 bg-transparent">
                <img src="../images/add-cart.svg" alt="addcart" />
              </button>
            </div>
          </div>
        </Link>
      </div>

    </>
  );
};

export default ProductCard;