import { useState } from "react";

import { useNavigate } from "react-router-dom";

import Navbar from "../home/Home_Navbar/Navbar";

import FromInput from "./fromInputReg";

const Register = () => {
  const navigate = useNavigate();

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

  const fetch_Log = async (input_register) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input_register), // Gửi dữ liệu data_search dưới dạng JSON
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
      saveLocalStorage("User", data.data);
      navigate("/");
      setError(null);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const click_register = (data) => {
    if (data.isValid) {
      fetch_Log(data.input_register);
    } else {

    }
  };

  return (
    <>
      <Navbar />
      <FromInput onClick={click_register} />
    </>
  );
};

export default Register;
