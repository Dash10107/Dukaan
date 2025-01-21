import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserWishlist } from "../features/user/userSlice";
import { addToWishlist } from "../features/products/productSlice";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlistState = useSelector((state) => state.auth.wishlist);

  useEffect(() => {
    dispatch(getUserWishlist());
  }, [dispatch]);

  const removeFromWishlistFunc = (productId) => {
    dispatch(addToWishlist(productId));
    setTimeout(() => {
      dispatch(getUserWishlist());
    }, 300);
  };

  return (
    <>
      <Meta title="Wishlist" />
      <BreadCrumb title="Wishlist" />
      <Container class1="wishlist-wrapper py-10 w-[80%] mx-auto">
        <h1 className="text-3xl font-bold mb-6">Your Wishlist</h1>
        {wishlistState?.length === 0 ? (
          <div className="text-center text-gray-500">
            <p className="text-xl">Your wishlist is empty</p>
            <button className="mt-4 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlistState?.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="relative">
                  <img
                    src="/placeholder.svg?height=200&width=300"
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  <button
                    className="absolute top-2 right-2 p-1 rounded-full bg-white/80 hover:bg-white"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      removeFromWishlistFunc(item._id);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 truncate">
                    {item.title}
                  </h3>
                  <p
                    className="text-gray-600 mb-2 line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  ></p>
                </div>
                <div className="p-4 pt-0 flex justify-between items-center">
                  <span className="text-xl font-bold">${item.price}</span>
                  <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-white bg-gray-800 hover:bg-black hover:scale-105 active:scale-95 hover:transition-all hover:duration-300">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </>
  );
};

export default Wishlist;
