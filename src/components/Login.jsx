import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
axios.defaults.baseURL = "";

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("basha@gmail.com");
  const [password, setPassword] = useState("Basha@1234");
  const [isLogin, setIsLogin] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "/api/login",
        { emailId, password },
        { withCredentials: true }
      );

      dispatch(addUser(res.data));

      toast.success(res.data.message || "Login successful!", {
        position: "top-center",
        autoClose: 3000,
      });

      navigate("/feed");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Login failed",
        { position: "top-center", autoClose: 3000 }
      );
      console.error(error);
    }
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        "/api/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );

      dispatch(addUser(res.data));

      toast.success(res.data.message || "Signup successful!", {
        position: "top-center",
        autoClose: 3000,
      });

      navigate("/profile");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Signup failed",
        { position: "top-center", autoClose: 3000 }
      );
      console.error(error);
    }
  };

  return (
    <div className="h-[90vh] flex items-center justify-center max-lg:w-full">
      <div className="card bg-[#fde825] text-neutral-content w-96 rounded-lg">
        <div className="card-body items-center text-center">
          <h1 className="text-[1.4vw]">
            {isLogin ? "Login" : "Sign Up"}
          </h1>

          {!isLogin && (
            <>
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                className="input input-bordered w-full max-w-xs rounded-md text-black"
              />
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                className="input input-bordered w-full max-w-xs rounded-md text-black"
              />
            </>
          )}

          <input
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            placeholder="Email"
            className="input input-bordered w-full max-w-xs rounded-md text-black"
          />

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="input input-bordered w-full max-w-xs rounded-md text-black"
          />

          <button
            onClick={isLogin ? handleLogin : handleSignup}
            className="btn btn-warning rounded-md px-[2vw] mt-4"
          >
            {isLogin ? "Login" : "Signup"}
          </button>

          <p
            className="link link-info mt-2"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin
              ? "New to DevTinder? Sign Up"
              : "Already at DevTinder? Login"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
