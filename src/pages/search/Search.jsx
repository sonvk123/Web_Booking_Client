import React, { useState, useEffect } from "react";

import SearchFrom from "./SearchPopup";
import SearchInfo from "./SearchInfo";

import { useLocation } from "react-router-dom";

import Navbar from "../home/Home_Navbar/Navbar";
import HomeFrom from "../home/Home_From/HomeFrom";
import HomeFooter from "../home/Home_Footer/HomeFooter";


import loading_svg from "../../loading/Spinner-1s-200px.svg";

import styles from "./Search.module.css";

const Search = () => {

  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const data_ = location.state.date[0]
  const [date, setDate] = useState(data_);
  const [options, setOptions] = useState(location.state.options);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const data = { destination, date, options };

  // const { datas, error, loading } = useSearch();

  const [datas, setDatas] = useState([]);

  const fetch_api = async (searchData) => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(searchData), // Gửi dữ liệu data_search dưới dạng JSON
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }
      const data = await response.json(); // Chuyển dữ liệu từ JSON sang đối tượng JavaScript
      setLoading(false);
      setDatas(data.data);
      return data;
    } catch (error) {
      setError("API request error:", error);
      throw error;
    }
  };
  useEffect(() => {

    fetch_api(data);
  }, []);

  const khi_nhan_Search = (searchData) => {

    fetch_api(searchData);
  };


  return (
    <>
      <Navbar />
      <div className={`${styles[`Search`]}`}>
        <SearchFrom data={data} onChange={khi_nhan_Search} />
        <div className={`${styles[`Info`]}`}>
          {loading ? (
            <div className={styles.loading}>
              <img src={loading_svg} alt="" />
            </div>
          ) : (
            error === null &&
            datas &&
            datas.map((data) => (
              <SearchInfo
                id={data._id}
                key={data._id}
                name={data.name}
                distance={data.distance}
                type={data.type}
                description={data.desc}
                price={data.price}
                rate={data.rating}
                image_url={data.photos[0]}
              />
            ))
          )}
        </div>
      </div>
      <HomeFrom />
      <HomeFooter />
    </>
  );
};

export default Search;

