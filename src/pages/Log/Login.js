import { useState, useContext } from "react";

import {DataContext} from "../../store/DataProvider";

import { useNavigate } from "react-router-dom";

import Navbar from "../home/Home_Navbar/Navbar";

import FromInput from "./fromInputLogin";

const Login = () => {
  const navigate = useNavigate();

  const { LOGIN } = useContext(DataContext);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(true);

  // Lưu giá trị vào localStorage
  const saveLocalStorage = (name, value) => {
    localStorage.setItem(name, JSON.stringify(value));
  };
  const showAlert = (errorMessage) => {
    window.alert(errorMessage);
  };

  
  let url =
    process.env.REACT_APP_NODE_ENV === "production"
      ? `${process.env.REACT_APP_URL_BE}`
      : "http://localhost:5000/";

  const fetch_Log = async (input_Login) => {
    try {
      setLoading(true);
      const response = await fetch(`${url}login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input_Login), // Gửi dữ liệu data_search dưới dạng JSON
      });

      if (!response.ok) {
        const errorData = await response.json();
        const message = errorData.message;
        const status = response.status;
        setError(message);
        setStatus(status);
        showAlert(message);
        return;
      }
      const data = await response.json();

      saveLocalStorage("isLogin", true);
      saveLocalStorage("User", data.data[0]);

      LOGIN(data.data[0]);

      navigate("/");
      setError(null);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const click_Login = (data) => {
    if (data.isValid) {
      fetch_Log(data.input_Login);
    } else {

    }
  };

  return (
    <>
      <Navbar />
      <FromInput onClick={click_Login} />
    </>
  );
};

export default Login;
