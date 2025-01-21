import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { BsSearch, BsHeart, BsPersonCircle, BsCart3, BsArrowRepeat } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, getCart } from "../features/products/productSlice";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  const [length, setLength] = useState(0);
  const [paginate, setPaginate] = useState(true);
  const products = useSelector((state) => state?.product?.products);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    dispatch(getCart());
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    const options = products?.map((product) => ({
      id: product?._id,
      name: product?.title,
    }));
    setOptions(options);
  }, [products]);

  const cart = useSelector((state) => state?.product?.cart);
  const user = JSON.parse(localStorage.getItem("user"));

  const logoutFunc = () => {
    localStorage.clear();
    window.location.reload();
  };

  const handleClick = () => {
    if (user) {
      navigate("/my-profile");
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    const length = cart?.length;
    setLength(length);
    const total = cart?.reduce(
      (accumulator, item) => accumulator + item?.quantity * item?.price,
      0
    );
    setTotal(total);
  }, [cart]);

  return (
    <header className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto"
            width="150"
            height="80"
            viewBox="0 0 192.756 192.756"
          >
            <g fill-rule="evenodd" clip-rule="evenodd">
              <path d="M49.665 79.176c-4.172-3.183-9.644-4.55-18.055-4.55H16.788l-8.284 7.597h9.743v35.972c2.41.327 6.128.65 11.276.65 8.605 0 15.709-1.816 20.34-5.644 4.169-3.573 7.235-9.352 7.235-17.731.001-7.79-2.869-12.924-7.433-16.294zM31.609 111.12c-1.175 0-2.611 0-3.452-.192V82.223h4.493c8.61 0 13.951 4.16 13.951 13.578 0 10.452-5.928 15.387-14.992 15.319zM63.68 118.391h9.913l-.551-27.356h-8.809l-.553 27.356zM136.621 74.625h-9.906l.545 27.357h8.808l.553-27.357zM68.635 73.912c-3.643 0-6.588 2.942-6.588 6.567 0 3.624 2.945 6.565 6.588 6.565 3.643 0 6.593-2.942 6.593-6.565 0-3.625-2.95-6.567-6.593-6.567zM109.309 110.277c-.781.321-2.604.578-4.818.578-8.151 0-13.892-5.254-13.892-14.345 0-9.478 6.327-14.154 14.603-14.154 4.83 0 7.754.78 10.174 1.883l.744-8.51c-2.393-.804-6.178-1.56-10.85-1.56-14.402 0-25.029 8.314-25.096 22.861 0 6.426 2.214 12.141 6.192 15.975 4.039 3.829 9.839 5.84 17.856 5.84 5.809 0 11.604-1.429 14.668-2.464V92.647h-9.582v17.63h.001zM167.648 110.146c-8.797 0-14.012-5.354-14.012-14.118 0-9.804 6.125-13.998 13.947-13.998 3.588 0 6.387.78 8.344 1.627l.74-8.356c-2.07-.732-5.381-1.388-9.477-1.388-13.293 0-23.98 7.701-23.98 22.631 0 12.536 7.814 21.848 23.006 21.848h9.756l8.279-8.245h-16.603v-.001zM131.668 105.718c-3.641 0-6.59 2.938-6.59 6.561 0 3.628 2.949 6.566 6.59 6.566 3.639 0 6.592-2.938 6.592-6.566 0-3.624-2.953-6.561-6.592-6.561z" />
            </g>
          </svg>
          </Link>

          {/* Main Navigation */}
          <nav className="hidden md:flex space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-purple-600 ${
                  isActive ? "text-purple-600" : "text-gray-700"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/product"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-purple-600 ${
                  isActive ? "text-purple-600" : "text-gray-700"
                }`
              }
            >
              Our Store
            </NavLink>
            <NavLink
              to="/order"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-purple-600 ${
                  isActive ? "text-purple-600" : "text-gray-700"
                }`
              }
            >
              My Orders
            </NavLink>
            <NavLink
              to="/blogs"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-purple-600 ${
                  isActive ? "text-purple-600" : "text-gray-700"
                }`
              }
            >
              Blogs
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-purple-600 ${
                  isActive ? "text-purple-600" : "text-gray-700"
                }`
              }
            >
              Contact
            </NavLink>
            <NavLink
              to="/api"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-purple-600 ${
                  isActive ? "text-purple-600" : "text-gray-700"
                }`
              }
            >
              API
            </NavLink>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-6">
            <Link
              to="/compareproduct"
              className="text-gray-700 hover:text-purple-600 transition-colors"
              title="Compare Products"
            >
              <BsArrowRepeat className="w-5 h-5" />
            </Link>
            
            <Link
              to="/wishlist"
              className="text-gray-700 hover:text-purple-600 transition-colors"
              title="Wishlist"
            >
              <BsHeart className="w-5 h-5" />
            </Link>

            <button
              onClick={handleClick}
              className="text-gray-700 hover:text-purple-600 transition-colors"
              title={user ? `Welcome, ${user.firstname}` : "Login"}
            >
              <BsPersonCircle className="w-5 h-5" />
            </button>

            <Link
              to="/cart"
              className="text-gray-700 hover:text-purple-600 transition-colors relative"
              title="Cart"
            >
              <BsCart3 className="w-5 h-5" />
              {length > 0 && (
                <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {length}
                </span>
              )}
            </Link>

            {user && (
              <button
                onClick={logoutFunc}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium px-4 py-2 rounded-full transition-colors"
              >
                Logout
              </button>
            )}

            {total > 0 && (
              <span className="text-sm font-medium text-gray-700">
                ${total.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;