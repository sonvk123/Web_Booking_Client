import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SearchList.module.css";

const SearchInfo = (props) => {
  const navigate = useNavigate();


  const click_see = () => {
    navigate(`/detail/${props.id}`);
  };

  return (
    <div className={styles.items}>
      <img src={props.image_url} alt="" className={styles.image} />
      <div className={styles.text}>
        <p className={styles.name}>{props.name}</p>
        <p className={styles.distance}>{props.distance} from center</p>
        <p className={styles.tag}>Free airport taxi</p>
        <p className={styles.type}>{props.type}</p>
        <p className={styles.content_1}>Free cancellation</p>
        <p className={styles.content_2}>You can cancal latter, so lock in this great proce today!</p>
        <p className={styles.price}>${props.price}</p>
        <p className={styles.rate}>{props.rate}</p>
        <p className={styles.content_3}>includes taxes and fees</p>
      </div>
      <button className={styles.btn} onClick={click_see}>
        See avalilability
      </button>
    </div>
  );
};

export default SearchInfo;
