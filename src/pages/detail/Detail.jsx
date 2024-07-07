import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Navbar from "../home/Home_Navbar/Navbar";
import HomeFrom from "../home/Home_From/HomeFrom";
import HomeFooter from "../home/Home_Footer/HomeFooter";
import styles from "./detail.module.css";

import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { startOfDay, parseISO } from "date-fns";
import DetailSelect from "./DetailSelect";
import ReserveInfo from "./ReserveInfo";

import { useSearch } from "../../store/useSearch";
import { DataContext } from "../../store/DataProvider";

const Detail = () => {
  const { isLogin } = useContext(DataContext);
  const params = useParams();
  const navigate = useNavigate();
  const { hotelID } = params;

  // thiết lập mặc định tạo ngày tháng năm
  const create_date = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Tháng bắt đầu từ 0, nên cộng thêm 1
    const day = currentDate.getDate() - 1; // trừ đi 1 để lấy ngày hôm nay
    return `${year}-${month < 10 ? "0" : ""}${month}-${
      day < 10 ? "0" : ""
    }${day}T17:00:00.000Z`;
  };
  const newDate = create_date();

  // set mặc định cho thời gian
  const [date, setDate] = useState([
    {
      startDate: startOfDay(parseISO(newDate)),
      endDate: startOfDay(parseISO(newDate)),
      key: "selection",
    },
  ]);

  // set state mặc định cho các thông tin
  const [isShow, setIsShow] = useState(false);
  const [useInfo, setUserInfo] = useState(null);
  const [Rooms, setRooms] = useState(null);
  const [payment, setPayment] = useState("Select");

  // lấy dữ liệu về khách sạn theo hotelID
  const { hotel, rooms, error, loading } = useSearch("Detail", hotelID, "get");

  // lấy dữ liệu các phòng trống theo thời gian đã chọn
  const {
    rooms: _rooms,
    error: _error,
    loading: _loading,
    fetch_api,
  } = useSearch("RoomsTime", "RoomsTime", "post");

  // khi thời gian được chọn thay đổi thì sẽ gọi lại api để lấy dữ liệu phòng trống theo thời gian mới
  useEffect(() => {
    fetch_api("RoomsTime", "RoomsTime", "post", {
      hotelId: hotel._id,
      rooms: rooms,
      date: date[0],
    });
  }, [date[0], isShow]);

  // lưu thông tin Transaction
  const post_data = async (sendData) => {
    const res = await fetch("http://localhost:5000/saveTransaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendData),
    });
    if (!res.ok) {
      throw new Error("API request failed");
    }
    const data = await res.json();
    // sau khi lưu thành công thì chuyển tới trang transactions
    navigate("/transactions");
  };

  // tổng số ngày đặt phòng
  let timeDifference = date[0].endDate - date[0].startDate;
  timeDifference = timeDifference === 0 ? 1 : timeDifference;
  const numberOfDays = Math.floor(timeDifference / (24 * 60 * 60 * 1000)) + 1;

  // dữ liệu sẽ được gửi đi
  const sendData = {
    user: useInfo !== null && useInfo.username,
    userId: useInfo !== null && useInfo.userId,
    hotelID: hotelID,
    room: Rooms !== null && Rooms.selectedRooms,
    dateStart: date[0].startDate,
    dateEnd: date[0].endDate,
    price: Rooms !== null && Rooms.totalPrice * numberOfDays,
    payment: payment,
  };

  // khi thay đổi thông tin trong đơn hàng
  const changeUseInfo = (data) => {
    setUserInfo(data);
  };
  // khi phòng được chọn thay đổi
  const changeRooms = (data) => {
    setRooms(data);
  };
  // khi thay đổi Payment
  const changePayment = (e) => {
    setPayment(e.target.value);
  };

  // khi nhấn nút Reserve Now
  const ReserveNow = () => {
    if(!isLogin){
      window.alert('Vui lòng đăng nhập để tiếp tục')
      return
    }
    if (!Rooms.selectedRooms.length || Rooms.selectedRooms.length === 0) {
      window.alert("vui lòng chọn ít nhất một phòng");
    } else if (payment === "Select") {
      window.alert("vui lòng chọn Paymet");
    } else {
      post_data(sendData);
    }
  };
  // thông tin khách sạn
  const Content = () => {
    return (
      <div className={styles.Detail}>
        <div className={styles.Detail_1}>
          <h1 className={styles.name}>{hotel.name}</h1>
          <FontAwesomeIcon icon={faLocationDot} />
          <span className={styles.address}> {hotel.address}</span>
          <p className={styles.distance}>
            Excellent location - {hotel.distance}m from center
          </p>
          <p className={styles.price}>
            Book a stay over ${hotel.price} at this property and get a free
            airport taxi
          </p>
          <div className={styles.div_img}>
            {hotel.photos.map((img, i) => (
              <img className={styles.image} alt="" src={img} key={i} />
            ))}
          </div>

          <button
            className={styles["btn-Detail_1"]}
            onClick={() => setIsShow(!isShow)}
          >
            Reserve or Book Now!
          </button>
        </div>
        <div className={styles.Detail_2}>
          <div className={styles.left}>
            <h1 className={styles.title}>{hotel.name}</h1>
            <p className={styles.description}>{hotel.desc}</p>
          </div>
          <div className={styles.right}>
            <h2>Perfect for a 9-night stay!</h2>

            <p className={styles.text}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
              rem ad, exercitationem eaque at vero!
            </p>
            <p className={styles.nine_night_price}>
              <span>${hotel.nine_night_price}</span> (9 nights)
            </p>
            <button
              className={styles["btn-Detail_2"]}
              onClick={() => setIsShow(!isShow)}
            >
              Reserve or Book Now!
            </button>
          </div>
        </div>
      </div>
    );
  };

  // chọn thời gian
  const Book = () => {
    return (
      <div className={styles.booking}>
        <h1>Dates</h1>
        <div className={styles.lsItem}>
          <DateRange
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            onChange={(item) => {
              setDate([item.selection]);
            }}
            ranges={date}
            minDate={startOfDay(parseISO(newDate))}
          />
        </div>
      </div>
    );
  };

  // nút đặt phòng
  const ResBtn = () => {
    return (
      <div className={styles.ResBtn}>
        <h1 className={styles.TotalBill}>Total Bill: ${sendData.price}</h1>
        <select value={payment} onChange={changePayment}>
          <option value="Select">Select Payment Method</option>
          <option value="CreditCard">Credit Card</option>
          <option value="Cash">Cash</option>
        </select>

        <button onClick={ReserveNow}>Reserve Now</button>
      </div>
    );
  };
  return (
    <>
      <Navbar />
      {!loading && hotel && <Content />}
      {isShow && (
        <div className={styles.bookingFrom}>
          <div className={styles.bookingFrom_info}>
            <Book />
            <ReserveInfo onChange={changeUseInfo} />
          </div>
          <DetailSelect
            rooms={_rooms.length === 0 ? rooms : _rooms}
            loading={_loading}
            error={_error}
            onChange={changeRooms}
          />
          <ResBtn />
        </div>
      )}

      <HomeFrom />
      <HomeFooter />
    </>
  );
};

export default Detail;
