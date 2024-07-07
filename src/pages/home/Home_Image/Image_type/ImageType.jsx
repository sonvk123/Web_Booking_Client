import React from "react";

import styles from "./ImageType.module.css";
const ImageType = (props) => {

  return (
    <>
      {props.data.map((value, i) => (
        <div key={i} className={`${styles["items"]}`}>
          <img src={value.image} alt="" className={`${styles["image"]}`} />
          <p className={`${styles["name"]}`}>{value.name}</p>
          <p className={`${styles["count"]}`}>
            {value.count} {value.type}
          </p>
        </div>
      ))}
    </>
  );
};

export default ImageType;
