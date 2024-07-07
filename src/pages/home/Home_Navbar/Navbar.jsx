import { useEffect, useState, useContext } from "react";

import { DataContext } from "../../../store/DataProvider";

import styles from "./navbar.module.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const { LOGOUT } = useContext(DataContext);

  const [isLogin, setIsLogin] = useState(false);
  const [User, setUser] = useState([]);

  // Lấy giá trị vào localStorage
  const LocalStorage = (name) => {
    return JSON.parse(localStorage.getItem(name));
  };

  // xóa giá trị vào localStorage
  const deleteLocalStorage = (name) => {
    localStorage.removeItem(name);
  };

  // xem đã đăng nhập chưa
  useEffect(() => {
    setUser(LocalStorage("User"));
    setIsLogin(LocalStorage("isLogin"));
  }, []);

  useEffect(() => {
    const value = localStorage.getItem("isLogin");
    if (value === "true") {
      setIsLogin(true);
    } else if (value === "false") {
      setIsLogin(false);
    }
  }, []);

  let url =
    process.env.REACT_APP_NODE_ENV === "production"
      ? `${process.env.REACT_APP_URL_Client}`
      : "http://localhost:3000/";

  // Thay thế URL hiện tại bằng URL mới
  const handleRedirect = () => {
    window.location.replace(url);
  };

  const click_Login = () => {
    navigate("/login");
  };

  const click_Logout = () => {
    deleteLocalStorage("User");
    deleteLocalStorage("isLogin");
    LOGOUT();
    navigate("/");
    window.location.reload();
  };

  const click_Register = () => {
    navigate("/register ");
  };

  const click_Transactions = () => {
    navigate("/transactions");
  };
  
  const ContentLogin = () => {
    return (
      <form>
        <button className={styles.navButton} onClick={click_Register}>
          Register
        </button>
        <button className={styles.navButton} onClick={click_Login}>
          Login
        </button>
      </form>
    );
  };

  const ContentLogout = () => {
    return (
      <div className={styles.ContentLogout}>
        <span>{User.email}</span>
        <form>
          <button className={styles.navButton} onClick={click_Transactions}>
            Transactions
          </button>
          <button className={styles.navButton} onClick={click_Logout}>
            Logout
          </button>
        </form>
      </div>
    );
  };
  return (
    <div className={styles.navbar}>
      <div className={styles.navContainer}>
        <span className={styles.logo} onClick={handleRedirect}>
          Booking Website
        </span>
        <div className={styles.navItems}>
          {!isLogin ? <ContentLogin /> : null}
          {isLogin ? <ContentLogout /> : null}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
