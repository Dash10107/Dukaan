import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { Eye, Heart, ShoppingCart, Truck, Tag } from "lucide-react";
import {
  addProductToCompare,
  addToWishlist,
} from "../features/products/productSlice";

const ProductCard = ({ grid, product }) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const addToWishlistFunc = (productId) => {
    dispatch(addToWishlist(productId));
  };

  const addToCompare = (e) => {
    e.preventDefault();
    dispatch(addProductToCompare(product));
  };

  return (
    <div
      className={`${location.pathname === "/product" ? `gr-${grid}` : "col-3"}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="group relative overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-lg"
      >
        <Link to={`/product/${product._id}`} className="block">
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden bg-gray-100">
            <img
              src={
                product?.images?.length > 0
                  ? product?.images[0].url
                  : "/images/watch.jpg"
              }
              alt={product.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Discount Badge */}
            <div className="absolute left-4 top-4">
              <span className="inline-flex items-center rounded-full bg-violet-100 px-3 py-1 text-xs font-medium text-violet-800">
                Up to 35% off
              </span>
            </div>

            {/* Quick Actions */}
            <div className="absolute right-4 top-4 flex flex-col gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  addToWishlistFunc(product?._id);
                }}
                className="rounded-full bg-white p-2 shadow-md transition-transform hover:scale-110 hover:bg-violet-50 hover:text-violet-600"
                title="Add to Wishlist"
              >
                <Heart className="h-5 w-5" />
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                className="rounded-full bg-white p-2 shadow-md transition-transform hover:scale-110 hover:bg-violet-50 hover:text-violet-600"
                title="Quick View"
              >
                <Eye className="h-5 w-5" />
              </button>
              <button
                onClick={addToCompare}
                className="rounded-full bg-white p-2 shadow-md transition-transform hover:scale-110 hover:bg-violet-50 hover:text-violet-600"
                title="Compare"
              >
                <Tag className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Title & Rating */}
            <div className="mb-4">
              <h3 className="mb-2 text-lg font-semibold text-gray-900 line-clamp-1">
                {product.title}
              </h3>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="h-4 w-4 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm font-medium text-gray-900">5.0</span>
                <span className="text-sm text-gray-500">(455)</span>
              </div>
            </div>

            {/* Features */}
            <div className="mb-4 flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <Truck className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">Fast Delivery</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Tag className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">Best Price</span>
              </div>
            </div>

            {/* Price & Action */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-baseline gap-2">
                <span className="text-2xl font-bold text-gray-900">
                  ${product.price}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  ${(product.price * 1.35).toFixed(2)}
                </span>
              </div>
              <button
                className="flex items-center gap-2 rounded-xl bg-gray-800 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-black hover:scale-105 active:scale-95 active:bg-gray-700"
                onClick={(e) => e.preventDefault()}
              >
                <ShoppingCart className="h-4 w-4" />
                Add to Cart
              </button>
            </div>
          </div>
        </Link>
      </motion.div>
    </div>
  );
};

export default ProductCard;
