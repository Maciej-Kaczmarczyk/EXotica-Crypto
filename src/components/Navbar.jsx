import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../resources/expedia_logo.svg";
import { CgMenuGridO } from "react-icons/cg";
import { UserAuth } from "../context/AuthContext";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { useAutoAnimate } from '@formkit/auto-animate/react'

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const toggleMenu = () => {
    setMenu(!menu);
  };

  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await logout();
      navigate("/");
    } catch (e) {
      console.log(e.message);
    }
  };

  const [parent] = useAutoAnimate()

  menu ? disableBodyScroll(document) : enableBodyScroll(document);

  return (
    <>
      <div className=" flex flex-col justify-center sm:flex-row items-center">
        <div className="flex justify-between items-center w-full h-15 mb-5 pt-5">
          <Link to="/">
            <img src={Logo} alt="Logo" className="w-[100px] sm:w-[130px]" />
          </Link>

          {user?.email ? (
            <div className="flex gap-3 items-center">
              <Link to="/account" className="hover:text-lime sm:text-base">
                Account
              </Link>
              <button
                onClick={handleSignOut}
                className="hidden md:block rounded-[10px] w-fit py-2 px-5  bg-lime text-darkgrey border-0 hover:bg-darkgrey hover:text-lime"
              >
                Sign Out
              </button>
              <CgMenuGridO
                onClick={toggleMenu}
                size={35}
                className=" hidden sm:block md:hidden"
              />
              <CgMenuGridO
                onClick={toggleMenu}
                size={30}
                className=" block sm:hidden"
              />
            </div>
          ) : (
            <div className="flex items-center gap-5">
              <div className="hidden md:flex flex-row-reverse items-center"></div>
              <Link to="/signin" className="hidden md:block text-white up">
                Sign In
              </Link>
              <Link to="/signup">
                <button className="hidden md:block btn bg-lime border-lime text-darkgrey hover:bg-lightgrey rounded-[10px]">
                  Sign Up
                </button>
              </Link>

              <CgMenuGridO
                onClick={toggleMenu}
                size={35}
                className=" hidden sm:block md:hidden"
              />
              <CgMenuGridO
                onClick={toggleMenu}
                size={30}
                className=" block sm:hidden"
              />
            </div>
          )}
        </div>

        <div 
          className={
            menu
              ? "md:hidden flex flex-col gap-5 items-center pt-10 fixed w-full h-[100vh] bg-darkgrey top-0 z-50 overflow-hidden "
              : "hidden overflow-hidden"
          }
        >
          <img src={Logo} alt="Logo" className="w-[150px] mb-10" />

          {user?.email ? (
            <div className="flex flex-col justify-center items-center gap-3">
              <p className="text-white text-base">{user?.email}</p>
              <button
                onClick={handleSignOut}
                className=" rounded-[10px] w-fit py-2 px-5  bg-lime text-darkgrey border-0 hover:bg-darkgrey hover:text-lime"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/signin"
                className=" text-lg hover:cursor-pointer text-white"
              >
                <p onClick={toggleMenu}>Sign In</p>
              </Link>
              <Link
                to="/signup"
                className="btn bg-lime border-lime text-darkgrey rounded-[10px]"
              >
                <p onClick={toggleMenu}>Sign Up</p>
              </Link>
            </>
          )}

          <div className=" fixed bottom-10">
            <button onClick={toggleMenu} className="btn btn-circle bg-grey">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
