import React, { useState } from "react";
import logo from "../assets/logoHyS.png";
import google from "../assets/google.png";
import facebook from "../assets/FacebookImage.webp";
import axios from "axios";
import { APP_URL } from "../utils";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";
import RegisterDialog from "./RegisterDialogBox";

const LoginDialogBox = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [openRegister, setOpenRegister] = useState(false);

  const openRegisterDialog =()=>{setOpenRegister(true)}
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(`${APP_URL}/auth/login`, formData, {
        withCredentials: true,
      });
      console.log(response.data);
      if (response.data?.token) {
        alert("Login Successfully ");
        dispatch(setUser(response.data));
        onClose();
      }
    } catch (error) {
      setError("Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <img
            src={logo}
            alt="Logo"
            className="h-11 w-16 object-cover rounded"
          />
          <button
            onClick={onClose}
            className="text-gray-500 text-3xl hover:text-gray-700"
          >
            &times;
          </button>
        </div>
        <h2 className="font-bold text-2xl text-center">Welcome Back</h2>
        <p className="my-1 text-sm text-gray-700 text-center">
          Enter your email and password to access your account
        </p>

        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your email"
              className="w-full h-[40px] border border-gray-300 rounded-md px-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Your password"
              className="w-full h-[40px] border border-gray-300 rounded-md px-2"
              required
            />
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="w-full h-[40px] bg-black text-white rounded-md hover:bg-gray-900"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div>
            <button
              type="button"
              className="w-full inline-flex items-center justify-center mb-5 py-2 px-4 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              onClick={() => {
                window.location.href =
                  "http://localhost:8888/oauth2/authorization/google";
              }}
            >
              <img src={google} alt="Google" className="h-6 mr-2" />
              Sign in with Google
            </button>
            <button
              type="button"
              className="w-full inline-flex items-center justify-center mb-5 py-2 px-4 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              
              onClick={() => {
                window.location.href =
                  "http://localhost:8888/oauth2/authorization/facebook";
              }}
            >
              <img src={facebook} alt="Facebook" className="h-6 mr-2" />
              Sign in with Facebook
            </button>
            Don't have an account?
            <button className="font-medium text-indigo-600 hover:text-indigo-500 text-center mt-2 ml-2" onClick={openRegisterDialog}>
              Register here
            </button>
          </div>
        </form>
        {openRegister && (
            // <RegisterDialog />
            <RegisterDialog isOpen={isOpen} onClose={onClose} />

        )}
      </div>
    </div>
  );
};

export default LoginDialogBox;
