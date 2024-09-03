import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logoHyS.png";
import google from "../assets/google.png";
import facebook from "../assets/FacebookImage.webp";
import axios from "axios";
import { APP_URL, getGoogleSignUp } from "../utils";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";
import { useGoogleLogin } from "@react-oauth/google";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      const response = await axios.post(`${APP_URL}/users/login`, formData, {
        withCredentials: true,
      });
      if (response.data?.token) {
        alert("Login Successfully ");
        dispatch(setUser(response.data));
        setTimeout(() => {
          navigate("/dashboard");
        }, 50);
      }
    } catch (error) {
      setError("Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      const user = await getGoogleSignUp(tokenResponse.access_token);
      setLoading(false);
      console.log(user)
      if (user.success === true) {
        dispatch(setUser(user));
        setTimeout(() => {
          navigate("/dashboard");
        }, 50);
      }
    },
  });

  return (
    <div className="h-full px-4 w-full lg:w-[45%] flex flex-col items-center">
      <div className="flex flex-col justify-center items-center">
        <div className="justify-center flex gap-8 py-4">
          <img src={logo} alt="Logo" className="h-11 w-16 object-cover rounded" />
        <h2 className="font-bold text-2xl">Welcome Back</h2>
        </div>
        <p className="my-1 text-sm text-gray-700">
          Enter your email and password to access your account
        </p>
      </div>

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
            onClick={() => googleLogin()}
          >
            <img src={google} alt="Google" className="h-6 mr-2" />
            Sign in with Google
          </button>
          <button
            type="button"
            className="w-full inline-flex items-center justify-center mb-5 py-2 px-4 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            // onClick={() => {
            //   window.location.href =
            //     "http://localhost:8888/oauth2/authorization/facebook";
            // }}
          >
            <img src={facebook} alt="Facebook" className="h-6 mr-2" />
            Sign in with Facebook
          </button>
          Don't have an account?
          <Link
            to="/register"
            className="font-medium text-indigo-600 hover:text-indigo-500 text-center mt-2 ml-2"
          >
            Register here
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
