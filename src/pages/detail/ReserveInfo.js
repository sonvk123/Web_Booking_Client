import React, { useState, useEffect, useContext } from "react";

import { DataContext } from "../../store/DataProvider";

import styles from "./detail.module.css";

const ReserveInfo = (props) => {
  const { isLogin } = useContext(DataContext);

  const [fullNameError, setFullNameError] = useState(true); // Thêm state để lưu lỗi full name
  const [emailError, setEmailError] = useState(true); // Thêm state để lưu lỗi email
  const [phoneNumberError, setPhoneNumberError] = useState(true); // Thêm state để lưu lỗi phone number
  // Lấy giá trị vào localStorage
  const LocalStorage = (name) => {
    return JSON.parse(localStorage.getItem(name));
  };

  // lấy dữ liêu User từ Local Storage
  const User = LocalStorage("User");

  // thiết lập thông tin khách hàng mặc định
  const [userInfo, setUserInfo] = useState({
    userId: "",
    username: "",
    fullName: "",
    email: "",
    phoneNumber: "",
    CardNumber: null,
  });

  // lấy thông tin khách hàng theo user đang đăng nhập
  useEffect(() => {
    isLogin &&
      setUserInfo((prevUserInfo) => ({
        ...prevUserInfo,
        userId: User._id,
        username: User.username,
        fullName: User.fullName,
        email: User.email,
        phoneNumber: User.phoneNumber.toString(),
      }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // khi thay đổi các thông tin cá nhân
  const handleChange = (e) => {
    const { name, value } = e.target;
    // kiểm tra xem có thông tin nào bị thiếu và bị lỗi không
    if (name === "fullName") {
      setFullNameError(value.trim().length === 0 ? false : true);
    }
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValidEmail = emailRegex.test(value);
      setEmailError(isValidEmail);
    }
    if (name === "phoneNumber") {
      setPhoneNumberError(value.trim().length === 0 ? false : true);
    }

    // lưu thông tin vào state
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value,
    }));
  };

  // Gọi hàm onChange của props khi userInfo thay đổi
  useEffect(() => {
    props.onChange(userInfo);
  }, [userInfo, props]);

  return (
    <>
      <div className={styles.ReserveInfo}>
        <h1>Reserve Info</h1>
        <label>Your Full Name:</label>
        <input
          className={`${fullNameError ? styles.input : styles.errorInput}`}
          placeholder="Full Name"
          type="text"
          name="fullName"
          value={userInfo.fullName}
          onChange={handleChange}
        ></input>
        <label>Your Email:</label>
        <input
          className={`${emailError ? styles.input : styles.errorInput}`}
          placeholder="Email"
          type="email"
          name="email"
          value={userInfo.email}
          onChange={handleChange}
        ></input>
        <label>Your Phone Number:</label>
        <input
          className={`${phoneNumberError ? styles.input : styles.errorInput}`}
          placeholder="Phone Number"
          type="text"
          name="phoneNumber"
          value={userInfo.phoneNumber}
          onChange={handleChange}
        ></input>
        <label>Your Identity Card Number:</label>
        <input
          className={styles.input}
          placeholder="Card Number"
          type="number"
          name="CardNumber"
          value={userInfo.CardNumber || ""}
          onChange={handleChange}
        ></input>
      </div>
    </>
  );
};

export default ReserveInfo;
