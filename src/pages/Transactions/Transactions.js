import React, { useEffect, useState } from "react";

import Navbar from "../home/Home_Navbar/Navbar";
import HomeFrom from "../home/Home_From/HomeFrom";
import HomeFooter from "../home/Home_Footer/HomeFooter";

import { format } from "date-fns";

import styles from "./Transactions.module.css";

const Transactions = () => {
  const [searchResult, setSearchResult] = useState({
    data: [],
    hotel: [],
    rooms: [],
    error: null,
    loading: true,
  });
  // Lấy giá trị vào localStorage
  const LocalStorage = (name) => {
    return JSON.parse(localStorage.getItem(name));
  };

  const User = LocalStorage("User");
  const userId = User._id;

  
  let url =
    process.env.REACT_APP_NODE_ENV === "production"
      ? `${process.env.REACT_APP_URL_BE}`
      : "http://localhost:5000/";

  useEffect(() => {
    const fetch_api = async () => {
      const apiUrl = `${url}getTransactions`;
      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: userId }),
        });
        if (!response.ok) {
          throw new Error("API request failed");
        }
        const data = await response.json();
        setSearchResult({
          data: data.data,
          error: null,
          loading: false,
        });
      } catch (error) {
        setSearchResult({
          data: [],
          error: `API request error: ${error}`,
          loading: false,
        });
      }
    };
    fetch_api();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Content = () => {
    return (
      <div className={styles.Transactions}>
        <h1>Your Transactions</h1>
        <div className={styles.title}>
          <div className={styles.items}>
            <div className={styles.item}>
              <p>#</p>
            </div>
            <div className={styles.item}>
              <p>Hotel</p>
            </div>
            <div className={styles.item}>
              <p>Room</p>
            </div>
            <div className={styles.item}>
              <p>Date</p>
            </div>
            <div className={styles.item}>
              <p>Price</p>
            </div>
            <div className={styles.item}>
              <p>Payment Method</p>
            </div>
            <div className={styles.item}>
              <p>Status</p>
            </div>
          </div>
          <div className={styles.data_value}>
            {searchResult.loading === false &&
              searchResult.error === null &&
              searchResult.data &&
              searchResult.data.map((value, index) => (
                <div className={styles.items_value} key={value._id}>
                  <div className={styles.item_value}>
                    {index <= 8 ? <p>0{index + 1}</p> : <p>{index + 1}</p>}
                  </div>
                  <div className={styles.item_value}>
                    <p>{value.hotel}</p>
                  </div>
                  <div className={styles.Room}>
                    {value.room.map((room, roomIndex) => (
                      // Kiểm tra xem phòng hiện tại có phải là phòng cuối cùng không
                      <p key={roomIndex}>
                        {roomIndex === value.room.length - 1
                          ? room
                          : room + ","}
                      </p>
                    ))}
                  </div>
                  <div className={styles.item_value}>
                    <p>{`${format(
                      new Date(value.dateStart),
                      "MM/dd/yyyy"
                    )}  -  ${format(
                      new Date(value.dateEnd),
                      "MM/dd/yyyy"
                    )}`}</p>
                  </div>
                  <div className={styles.item_value}>
                    <p>${value.price}</p>
                  </div>
                  <div className={styles.item_value}>
                    <p>{value.payment}d</p>
                  </div>
                  <div className={styles.item_value}>
                    <p className={styles[value.status]}>{value.status}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      <Navbar />
      {searchResult.loading === false &&
        searchResult.error === null &&
        searchResult.data && <Content />}
      <HomeFrom />
      <HomeFooter />
    </>
  );
};
export default Transactions;
