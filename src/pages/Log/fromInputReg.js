import { useState, useEffect } from "react";

import styles from "./Log.module.css";

const FromInput = (props) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //  kiểm tra xem nhập đúng hay sai
  const [isValidFullName, setIsValidFullName] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false);
  const [isValiUsername, setIsValiUsername] = useState(false);
  const [passwordPassword, setpasswordPassword] = useState(false);

  // kiểm tra xem đã nhấn vào input chưa
  const [isFullNameChanged, setIsFullNameChanged] = useState(false);
  const [isUsernameChanged, setIsUsernameChanged] = useState(false);
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const [isEmailChanged, setIsEmailChanged] = useState(false);
  const [isPhoneNumberChanged, setIsPhoneNumberChanged] = useState(false);

  const [isRegisterClicked, setIsRegisterClicked] = useState(false);

  // kiểm tra xem đã đúng hết chưa
  const [isValid, setIsValid] = useState(false);
  useEffect(() => {
    isValidFullName &&
    isValidEmail &&
    isValidPhoneNumber &&
    isValiUsername &&
    passwordPassword
      ? setIsValid(true)
      : setIsValid(false);
  }, [
    isValidFullName,
    isValidEmail,
    isValidPhoneNumber,
    isValiUsername,
    passwordPassword,
  ]);
  const changefullName = (e) => {
    setFullName(e.target.value);
    setIsFullNameChanged(true);
    e.target.value.length >= 4
      ? setIsValidFullName(true)
      : setIsValidFullName(false);
  };

  const changeUserName = (e) => {
    setUsername(e.target.value);
    setIsUsernameChanged(true);
    e.target.value.length >= 6
      ? setIsValiUsername(true)
      : setIsValiUsername(false);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
    setIsPasswordChanged(true);
    e.target.value.length >= 8
      ? setpasswordPassword(true)
      : setpasswordPassword(false);
  };

  const changeEmail = (e) => {
    setEmail(e.target.value);
    setIsEmailChanged(true);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    emailRegex.test(email) ? setIsValidEmail(true) : setIsValidEmail(false);
  };

  const changePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
    setIsPhoneNumberChanged(true);
    e.target.value.length >= 10
      ? setIsValidPhoneNumber(true)
      : setIsValidPhoneNumber(false);
  };

  const click_register = (e) => {
    e.preventDefault();
    // khi nhấn button thì tất cả các kiểm tra xem đã thay đổi input chưa đều đặt là true
    setIsRegisterClicked(true);
    setIsPhoneNumberChanged(true);
    setIsEmailChanged(true);
    setIsPasswordChanged(true);
    setIsUsernameChanged(true);
    setIsFullNameChanged(true);

    const data = {
      input_register: {
        fullName: fullName,
        email: email,
        phoneNumber: phoneNumber,
        username: username,
        password: password,
      },
      isValid: isValid,
    };
    
    props.onClick(data);
  };

  return (
    <div className={styles.Log}>
      <h1>Sign Up</h1>
      <form>
        <label>Full Name</label>
        <input
          onChange={changefullName}
          className={styles.fullName}
          placeholder="fullname"
        ></input>
        
        {!isValidFullName && isFullNameChanged && isRegisterClicked && (
          <p>Full Name phải có ít nhất 4 ký tự</p>
        )}

        <label>User Name</label>
        <input
          onChange={changeUserName}
          className={styles.username}
          placeholder="username"
        ></input>
        {!isValiUsername && isUsernameChanged && isRegisterClicked && (
          <p>User Name phải có ít nhất 6 ký tự</p>
        )}
        <label>Password </label>
        <input
          onChange={changePassword}
          className={styles.password}
          placeholder="password"
        ></input>
        {!passwordPassword && isPasswordChanged && isRegisterClicked && (
          <p>Password phải có ít nhất 8 ký tự</p>
        )}
        <label>Email</label>
        <input
          onChange={changeEmail}
          className={styles.email}
          placeholder="email"
        ></input>

        {!isValidEmail && isEmailChanged && <p>Định dạng email không hợp lệ</p>}
        <label>Phone Number</label>
        <input
          onChange={changePhoneNumber}
          className={styles.phoneNumber}
          placeholder="phoneNumber"
        ></input>
        {!isValidPhoneNumber && isPhoneNumberChanged && isRegisterClicked && (
          <p>Phone Number phải có ít nhất 10 ký tự</p>
        )}

        <button
          className={styles.button}
          onClick={click_register}
          // disabled={!isValid}
        >
          Register
        </button>
      </form>
    </div>
  );
};
export default FromInput;


