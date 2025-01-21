import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useNavigate } from "react-router-dom";

const SpecialProduct = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full mb-6">
      <div 
        className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105"
        onClick={() => {
          navigate(`/product/${product._id}`);
          window.location.reload();
          window.scrollTo(0, 0);
        }}
      >
        <div className="flex">
          <div className="w-2/5 p-4">
            <img 
              src={product?.images.length > 0 ? product?.images[0].url : "/images/watch.jpg"} 
              className="w-full h-auto object-cover rounded-md" 
              alt={product?.title} 
            />
          </div>
          <div className="w-3/5 p-4">
            <h5 className="text-sm text-gray-500 uppercase mb-1">{product?.brand}</h5>
            <h6 className="text-lg font-semibold mb-2 line-clamp-2">{product?.title}</h6>
            <div className="mb-2">
              <ReactStars
                count={5}
                size={20}
                value={product?.totalrating}
                edit={false}
                activeColor="#ffd700"
              />
            </div>
            <div className="mb-3">
              <span className="text-2xl font-bold text-red-600">${product?.price}</span>
              <span className="ml-2 text-sm text-gray-500 line-through">${product?.price}</span>
            </div>
            <div className="flex items-center mb-3">
              <p className="text-sm font-semibold mr-4">
                <span className="text-lg">5</span> days
              </p>
              <div className="flex items-center space-x-1">
                <span className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center text-xs font-bold">1</span>
                <span className="text-lg font-bold">:</span>
                <span className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center text-xs font-bold">1</span>
                <span className="text-lg font-bold">:</span>
                <span className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center text-xs font-bold">1</span>
              </div>
            </div>
            <div className="mb-4">
              <p className="text-sm mb-1">Products: {product?.quantity}</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${(product.quantity / (product.quantity + product.sold)) * 100}%` }}
                ></div>
              </div>
            </div>
            <Link 
              to="/cart" 
              className="inline-block px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-300"
            >
              Add to Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialProduct;