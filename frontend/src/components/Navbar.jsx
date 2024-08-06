import React from "react";
import { Link as NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="bg-white shadow-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1 md:py-4">
          <div className="flex items-center justify-between md:justify-start">
            <NavLink
              to="/products"
              className="font-bold text-gray-700 text-2xl"
            >
              Ecom.
            </NavLink>

            <div className="hidden md:flex space-x-3 flex-1 lg:ml-8">
              <NavLink
                to="/products"
                className="px-2 py-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600"
              >
                Products
              </NavLink>
              <NavLink
                to="/combo-products"
                className="px-2 py-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600"
                activeClassName="text-black"
              >
                Combo Deals
              </NavLink>
            </div>

            <div className="flex items-center space-x-4">
              <a
                href="#"
                className="flex h-10 items-center px-2 rounded-lg border border-gray-200 hover:border-gray-300 focus:outline-none hover:shadow-inner"
              >
                <svg
                  className="h-6 w-6 leading-none text-gray-300 stroke-current"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                <span className="pl-1 text-gray-500 text-md">0</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
