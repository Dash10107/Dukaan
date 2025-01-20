import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductToCompare,
  addToWishlist,
} from "../features/products/productSlice";
import { BiEdit, BiTrash } from "react-icons/bi";
const ProductCard = (props) => {
  const { grid, product } = props;
  let location = useLocation();
  const dispatch = useDispatch();

  const addToWishlistFunc = (productId) => {
    dispatch(addToWishlist(productId));
  };

  const addToCompare = (e) => {
    e.preventDefault();
    dispatch(addProductToCompare(product));
  };

  return (
    <>
      <div
        className={` ${
          location.pathname === "/product" ? `gr-${grid}` : "col-3"
        } `}
      >
        <Link
          className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
          to={`/product/${product._id}`}
        >
          <div className="h-56 w-full">
            <a href="##">
              <img
                className="mx-auto h-full"
                src={
                  product?.images?.length > 0
                    ? product?.images[0].url
                    : "/images/watch.jpg"
                }
                alt=""
              />
            </a>
          </div>
          <div className="pt-6">
            <div className="mb-4 flex items-center justify-between gap-4">
              <span className="me-2 rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">
                {" "}
                Up to 35% off{" "}
              </span>
              <div className="flex items-center justify-end gap-1">
                <button
                  type="button"
                  data-tooltip-target="tooltip-quick-look"
                  className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only"> Quick look </span>
                  <svg
                    className="h-5 w-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeWidth={2}
                      d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                    />
                    <path
                      stroke="currentColor"
                      strokeWidth={2}
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                </button>
                <div
                  id="tooltip-quick-look"
                  role="tooltip"
                  className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
                  data-popper-placement="top"
                >
                  Quick look
                  <div className="tooltip-arrow" data-popper-arrow="" />
                </div>
                <button
                  type="button"
                  data-tooltip-target="tooltip-add-to-favorites"
                  className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only"> Add to Favorites </span>
                  <svg
                    className="h-5 w-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"
                    />
                  </svg>
                </button>
                <div
                  id="tooltip-add-to-favorites"
                  role="tooltip"
                  className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
                  data-popper-placement="top"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addToWishlistFunc(product?._id);
                  }}
                >
                  Add to favorites
                  <div className="tooltip-arrow" data-popper-arrow="" />
                </div>
              </div>
            </div>
            <a
              href="##"
              className="text-lg font-semibold leading-tight text-gray-900 hover:underline"
            >
              {product.title}
            </a>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="h-4 w-4 text-yellow-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm font-medium text-gray-900">5.0</p>
              <p className="text-sm font-medium text-gray-500">(455)</p>
            </div>
            <ul className="mt-2 flex items-center gap-4">
              <li className="flex items-center gap-2">
                <svg
                  className="h-4 w-4 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
                  />
                </svg>
                <p className="text-sm font-medium text-gray-500">
                  Fast Delivery
                </p>
              </li>
              <li className="flex items-center gap-2">
                <svg
                  className="h-4 w-4 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="2"
                    d="M8 7V6c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1h-1M3 18v-7c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
                  />
                </svg>
                <p className="text-sm font-medium text-gray-500">Best Price</p>
              </li>
            </ul>
            <div className="mt-4 flex items-center justify-between gap-4">
              <p className="text-2xl font-extrabold leading-tight text-gray-900">
                {product.price}
              </p>
              <button type="button" className="button">
                Add to Cart
              </button>
            </div>
          </div>
        </Link>

        {/* <Link
          to={`/product/${product._id}`}
          className="product-card position-relative"
        >
          <div className="wishlist-icon position-absolute">
            <button
              className="border-0 bg-transparent"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToWishlistFunc(product?._id);
              }}
            >
              <img src="../images/wish.svg" alt="wish" />
            </button>
          </div>
          <div className="product-image">
            {product?.images?.map((image, index) => (
              <img
                src={image.url}
                key={index}
                className="img-fluid  mx-auto"
                width={160}
                alt=""
              />
            ))}

            <img
              src={
                product?.images?.length > 0
                  ? product?.images[0]?.url
                  : "../images/watch.jpg"
              }
              className="img-fluid  mx-auto"
              width={160}
              alt=""
            />
            <img
              src={
                product?.images?.length > 0
                  ? product?.images[1]?.url
                    ? product?.images[1]?.url
                    : product?.images[0]?.url
                  : "../images/watch-1.avif"
              }
              className="img-fluid  mx-auto"
              width={160}
              alt=""
            />
          </div>
          <div className="product-details">
            <h6 className="brand">{product.brand}</h6>
            <h5 className="product-title">{product.title}</h5>
            <ReactStars
              count={5}
              size={24}
              value={product.totalrating}
              edit={false}
              activeColor="#ffd700"
            />
            <p
              className={`description ${grid === 12 ? "d-block" : "d-none"}`}
              dangerouslySetInnerHTML={{ __html: product?.description }}
            ></p>
            <p className="price">{product.price}</p>
          </div>
          <div className="action-bar position-absolute">
            <div className="d-flex flex-column gap-15">
              <button
                className="border-0 bg-transparent"
                onClick={addToCompare}
              >
                <img src="../images/prodcompare.svg" alt="compare" />
              </button>
              <button className="border-0 bg-transparent">
                <img src="../images/view.svg" alt="view" />
              </button>
              <button className="border-0 bg-transparent">
                <img src="../images/add-cart.svg" alt="addcart" />
              </button>
            </div>
          </div>
        </Link> */}
      </div>
    </>
  );
};

export default ProductCard;
