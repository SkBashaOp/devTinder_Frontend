import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import api from "../utils/apiInstance";
import { addUser } from "../store/userSlice";

const Body = () => {
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const location = useLocation();

  const fetchUser = async () => {
    if (userData) return;

    try {
      const res = await api.get(
        "/api/profile/view",
        { withCredentials: true }
      );

      dispatch(addUser(res.data));

      if (location.pathname === "/") {
        navigate("/feed");
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        navigate("/");
      }
      console.error("Failed to fetch user", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="w-screen min-h-screen bg-c">
      <ToastContainer />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
