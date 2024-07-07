import React, { useEffect, useState } from "react";

import styles from "./HomeImage.module.css";

import ImageCity from "./Image_city/ImageCity";
import ImageInfo from "./Image_info/ImageInfo";
import ImageType from "./Image_type/ImageType";

const HomeImage = (props) => {
  const [data, setData] = useState(false);
  const [hotels_city, setHotels_city] = useState([]);
  const [hotels_type, setHotels_type] = useState([]);
  const [hotels_rating, setHotels_rating] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  let url =
    process.env.REACT_APP_NODE_ENV === "production"
      ? `${process.env.REACT_APP_URL_BE}`
      : "http://localhost:5000/";

  console.log("url:", url);

  useEffect(() => {
    const fetch_api = async () => {
      try {
        setLoading(true);
        const res = await fetch(url);
        const data = await res.json();
        setData(true);
        setHotels_city(data.data.hotels_city);
        setHotels_type(data.data.hotels_type);
        setHotels_rating(data.data.hotels_rating);
      } catch (err) {
        setError("lỗi rồi");
      } finally {
        setLoading(false);
      }
    };
    fetch_api();
  }, []);
  // sắp xếp rating từ cao đến thấp
  return (
    <>
      {data && error === null && loading === false ? (
        <div className={`${styles["HomeImage"]}`}>
          <div className={`${[styles["cityes"]]}`}>
            <ImageCity data={hotels_city} url={url} />
          </div>
          <h1>Browse by property type</h1>
          <div className={`${styles["type"]}`}>
            <ImageType data={hotels_type} />
          </div>
          <h1>Homes guests love</h1>
          <div className={`${styles["info"]}`}>
            {hotels_rating.map((hotel) => (
              <ImageInfo
                // className={`${styles["PageInfo"]}`}
                id={hotel._id}
                key={hotel._id}
                name={hotel.name}
                city={hotel.city}
                price={hotel.price}
                rate={hotel.rating}
                type={hotel.type}
                image_url={hotel.photos[1]}
              />
            ))}
          </div>
        </div>
      ) : (
        <p>DDang load ...</p>
      )}
    </>
  );
};

export default HomeImage;
