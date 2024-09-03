import axios from "axios";
import React, { useEffect } from "react";
import { APP_URL } from "../utils";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";

const QueryParam = () => {
  const params = new URLSearchParams(document.location.search);
  const status = params.get("status");
  const username = params.get("userName");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = {
    email: username,
    password: "deba120",
  };

  const getUserData = async () => {
    if (status == "success") {
      console.log(formData);
      try {
        const response = await axios.post(`${APP_URL}/auth/login`, formData, {
          withCredentials: true,
        });
        if (response.data?.token) {
          dispatch(setUser(response.data));
          
        }
        else{
          navigate("/")
        }
      } catch (error) {
        setError("Something went wrong! Please try again.");
      }
    } else {
      navigate("/");
      alert("Event registrstion failed");
      return;
    }
  };

  getUserData();

  return <div></div>;
};

export default QueryParam;
