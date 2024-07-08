import React from "react";

import { useNavigate } from "react-router-dom";

import styles from "./ImageInfo.module.css";

let url =
  process.env.REACT_APP_NODE_ENV === "production"
    ? `${process.env.REACT_APP_URL_Client}`
    : "http://localhost:3000/";

const ImageInfo = (props) => {
  const navigate = useNavigate();

  const click = () => {
    navigate(`detail/${props.id}`);
  };

  return (
    <div className={`${styles["items"]}`}>
      <img src={props.image_url} alt="" className={`${styles["image"]}`} />
      <p className={`${styles["name"]}`} onClick={click}>
        {props.name}
      </p>
      <p className={`${styles["city"]}`}>{props.city}</p>
      <p className={`${styles["price"]}`}>
        <span>Startig from</span> ${props.price}
      </p>
    </div>
  );
};

export default ImageInfo;
