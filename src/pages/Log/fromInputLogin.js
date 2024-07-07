import { useState, useEffect } from "react";


import styles from "./Log.module.css";

const FromInput = (props) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //  kiểm tra xem nhập đúng hay sai
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);

  // kiểm tra xem đã nhấn vào input chưa
  const [isEmailChanged, setIsEmailChanged] = useState(false);
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);

  const [isRegisterClicked, setIsRegisterClicked] = useState(false);

  // kiểm tra xem đã đúng hết chưa
  const [isValid, setIsValid] = useState(false);
  useEffect(() => {
    isValidEmail && isValidPassword ? setIsValid(true) : setIsValid(false);
  }, [isValidEmail, isValidPassword]);

  const changeEmail = (e) => {
    setEmail(e.target.value);
    setIsEmailChanged(true);
    validateEmail(e.target.value)
      ? setIsValidEmail(true)
      : setIsValidEmail(false);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
    setIsPasswordChanged(true);
    e.target.value.length >= 8
      ? setIsValidPassword(true)
      : setIsValidPassword(false);
  };

  const click_register = (e) => {
    e.preventDefault();
    // khi nhấn button thì tất cả các kiểm tra xem đã thay đổi input chưa đều đặt là true
    setIsRegisterClicked(true);
    setIsEmailChanged(true);
    setIsPasswordChanged(true)
    const data = {
      input_Login: {
        email: email,
        password: password,
      },
      isValid: isValid,
    };
    props.onClick(data);
  };

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }


  return (
    <div className={styles.Log}>
      <h1>Log in</h1>
      <form>
        <label>Email</label>
        <input
          onChange={changeEmail}
          className={styles.email}
          placeholder="email"
        ></input>
        {!isValidEmail && isEmailChanged && <p>Định dạng email không hợp lệ</p>}

        <label>Password </label>
        <input
          onChange={changePassword}
          className={styles.password}
          placeholder="password"
        ></input>
        {!isValidPassword && isPasswordChanged && isRegisterClicked && (
          <p>Password phải có ít nhất 8 ký tự</p>
        )}

        <button
          className={styles.button}
          onClick={click_register}
          // disabled={!isValid}
        >
          Log in
        </button>
      </form>
    </div>
  );
};
export default FromInput;
