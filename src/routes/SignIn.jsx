import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signIn, UserAuth } from "../context/AuthContext";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signIn } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      navigate("/account");
    } catch (error) {
      setError(error.message);
      console.log(error.message);
    }
  };

  return (
    <div className="flex items-center h-[90vh] pb-32 justify-center">
      <div className="flex flex-col rounded-[10px] bg-darkgrey border-2 border-lime p-8 xs:p-20 w-fit text-white">
        <form onSubmit={handleSubmit}>
          <h3 className=" mb-8 text-center text-3xl">Sign In</h3>

          <div className="flex flex-col gap-5">
            <div>
              <p>Email</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="email"
                className=" bg-grey rounded-[10px] text-white text-sm placeholder:text-sm placeholder:text-lightgrey h-9 focus:outline-0 px-5"
              />
            </div>

            <div>
              <p>Password</p>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="password"
                className=" bg-grey rounded-[10px] text-white text-sm placeholder:text-sm placeholder:text-lightgrey h-9 focus:outline-0 px-5"
              />
            </div>
          </div>

          <div className="flex flex-col justify-center items-center">
            <button
              type="submit"
              className="rounded-[10px] w-fit py-2 px-5 mt-8  bg-lime text-darkgrey border-0 hover:bg-darkgrey hover:text-lime"
            >
              Sign In
            </button>
            <p className="mt-3 text-sm">
              Don't have an account?{" "}
              <Link to="/signup" className="text-lime">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
