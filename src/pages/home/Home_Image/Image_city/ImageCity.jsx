import React from "react";

import styles from "./ImageCity.module.css";
const ImageCity = (props) => {
  const hotels_city = props.data;
  const url = props.url;

  return (
    <>
      <div className={`${styles["items"]}`}>
        <img
          src={`${url}images/${hotels_city.HN.image}`}
          alt=""
          className={`${styles["image"]}`}
        />
        <p className={`${styles["name"]}`}>Hà Nội</p>
        <p className={`${styles["subText"]}`}>
          {hotels_city.HN.count} properties
        </p>
      </div>
      <div className={`${styles["items"]}`}>
        <img
          src={`${url}images/${hotels_city.HCM.image}`}
          alt=""
          className={`${styles["image"]}`}
        />
        <p className={`${styles["name"]}`}>Hồ Chí Minh</p>
        <p className={`${styles["subText"]}`}>
          {hotels_city.HCM.count} properties
        </p>
      </div>
      <div className={`${styles["items"]}`}>
        <img
          src={`${url}images/${hotels_city.DN.image}`}
          alt=""
          className={`${styles["image"]}`}
        />
        <p className={`${styles["name"]}`}>Đà Nẵng</p>
        <p className={`${styles["subText"]}`}>
          {hotels_city.DN.count} properties
        </p>
      </div>
    </>
  );
};

export default ImageCity;
