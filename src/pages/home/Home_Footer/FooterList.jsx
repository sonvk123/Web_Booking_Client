import React from "react";

import styles from "./FooterList.module.css";

const FooterList = (props) => {

  return (
    <div className={`${styles[`FooterList`]}`}>
      {props.value.col_values.map((value,i) => (
        <p key={i}>{value}</p>
      ))}
    </div>
  );
};

export default FooterList;
