import React, { useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import {useDispatch,useSelector} from "react-redux";
import { getUserWishlist } from "../features/user/userSlice";
import { addToWishlist } from "../features/products/productSlice";
const Wishlist = () => {
  const dispatch = useDispatch();


  useEffect(()=>{
    dispatch(getUserWishlist());
  }
  ,[])



  const wishlistState = useSelector(state=>state.auth.wishlist);

  const removeFromWishlistFunc = (productId) => {
    dispatch(addToWishlist(productId));  
    setTimeout(()=>{
      dispatch(getUserWishlist());
    }
    ,300)
  }
  return (
    <>
      <Meta title={"Wishlist"} />
      <BreadCrumb title="Wishlist" />
      <Container class1="wishlist-wrapper home-wrapper-2 py-5">
        <div className="row">
          {
            wishlistState?.length === 0 && <div className="col-12 text-center">No items in wishlist
            </div>

          }
          {
            wishlistState?.length > 0 && wishlistState?.map((item,index)=>(
              <div className="col-3" key={index}>
                <div className="wishlist-card position-relative">
                  <img
                    src="images/cross.svg"
                    alt="cross"
                    onClick={(e)=>{e.preventDefault();e.stopPropagation(); removeFromWishlistFunc(item._id)}}
                    className="position-absolute cross img-fluid"
                  />
                  <div className="wishlist-card-image">
                    <img
                      src="images/watch.jpg"
                      className="img-fluid w-100"
                      alt="watch"
                    />
                  </div>
                  <div className="py-3 px-3">
                    <h5 className="title">
                      {item.title}
                    </h5>
                    <h6 className="price">$ {item.price}</h6>
                  </div>
                </div>
              </div>
            ))
          }

        </div>
      </Container>
    </>
  );
};

export default Wishlist;