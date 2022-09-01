import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { BiLeftArrowAlt } from "react-icons/bi";
import SavedCoin from "../components/SavedCoin";
import { UserAuth } from "../context/AuthContext";

const Account = () => {
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
  if (user) {
    return (
      <>
        <Link to="/">
          <div className="flex items-center hover:text-lime">
            <BiLeftArrowAlt size={40} />
            <p>Home</p>
          </div>
        </Link>

        <div className="flex justify-center items-center my-10">
          <div className="bg-darkgrey w-full h-fit rounded-[10px]">
            <div className="flex w-full items-center justify-center">
              <h2 className="text-white text-xl">
                Welcome, <span className="text-lime">{user?.email}</span>
              </h2>
            </div>

            <div className="flex justify-center my-10">
              <h1 className="text-white text-4xl">Watchlist</h1>
            </div>

            <div className="flex flex-col mt-4 w-full">
              <SavedCoin />
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return <Navigate to="/signin" />;
  }
};

export default Account;
