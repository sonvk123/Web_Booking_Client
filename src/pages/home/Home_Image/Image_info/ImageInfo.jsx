import React from "react";

import styles from "./ImageInfo.module.css";

const ImageInfo = (props) => {
  return (
    <div className={`${styles["items"]}`}>
      <img src={props.image_url} alt="" className={`${styles["image"]}`} />
      <p>
        <a
          className={`${styles["name"]}`}
          href={`http://localhost:3000/detail/${props.id}`}
        >
          {props.name}
        </a>
      </p>
      <p className={`${styles["city"]}`}>{props.city}</p>
      <p className={`${styles["price"]}`}>
        <span>Startig from</span> ${props.price}
      </p>
    </div>
  );
};

export default ImageInfo;
