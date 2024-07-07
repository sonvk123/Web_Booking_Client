import React, { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import styles from "./SearchPopup.module.css";

const SearchFrom = (props) => {
  // Khởi tạo state data_search với giá trị mặc định từ props
  const data = props.data;
  const [openDate, setOpenDate] = useState(false);
  const [data_search, setData_search] = useState({
    destination: data.destination,
    date: {
      startDate: data.date.startDate,
      endDate: data.date.endDate,
      key: data.date.key,
    },
    options: {
      adult: data.options.adult,
      children: data.options.children,
      room: data.options.room,
    },
  });

  // Hàm xử lý khi trường "Destination" thay đổi
  const changedDestination = (e) => {
    const newDestination = e.target.value;
    // Cập nhật giá trị destination trong data_search
    setData_search((prevData) => ({
      ...prevData,
      destination: newDestination,
    }));
  };
  const click_search = () => {
    props.onChange(data_search);
  };

  return (
    <div className={styles.From}>
      <div className={styles.listSearch}>
        <h1 className={styles.lsTitle}>Search</h1>

        {/* Trường "Destination" */}
        <div className={styles.lsItem}>
          <label>Destination</label>
          <input
            placeholder={data_search.destination}
            type="text"
            onChange={changedDestination}
          ></input>
        </div>

        {/* Trường "Check-in Date" */}
        <div className={styles.lsItem}>
          <label>Check-in Date</label>
          <span onClick={() => setOpenDate(!openDate)}>
            {`${format(data_search.date.startDate, "MM/dd/yyyy")} to ${format(
              data_search.date.endDate,
              "MM/dd/yyyy"
            )}`}
          </span>
          {openDate && (
            <DateRange
              onChange={(item) => {
                // Cập nhật giá trị date trong data_search khi ngày thay đổi
                setData_search((prevData) => ({
                  ...prevData,
                  date: {
                    startDate: item.selection.startDate,
                    endDate: item.selection.endDate,
                    key: data_search.date.key,
                  },
                }));
              }}
              minDate={new Date()}
              ranges={[data_search.date]}
            />
          )}
        </div>

        {/* Trường "Options" */}
        <div className={styles.lsItem}>
          <label>Options</label>
          <div className={styles.lsOptions}>
            {/* Trường "Min price per night" */}
            <div className={styles.lsOptionItem}>
              <span className="lsOptionText">
                Min price <small>per night</small>
              </span>
              <input type="number" className={styles.lsOptionInput} />
            </div>

            {/* Trường "Max price per night" */}
            <div className={styles.lsOptionItem}>
              <span className="lsOptionText">
                Max price <small>per night</small>
              </span>
              <input type="number" className={styles.lsOptionInput} />
            </div>

            {/* Trường "Adult" */}
            <div className={styles.lsOptionItem}>
              <span className="lsOptionText">Adult</span>
              <input
                type="number"
                min={0}
                className={styles.lsOptionInput}
                placeholder={data_search.options.adult}
                onChange={(e) => {
                  const adultValue = parseInt(e.target.value);
                  // Cập nhật giá trị adult trong data_search khi giá trị thay đổi
                  setData_search((prevData) => ({
                    ...prevData,
                    options: {
                      ...prevData.options,
                      adult: adultValue,
                    },
                  }));
                }}
              />
            </div>

            {/* Trường "Children" */}
            <div className={styles.lsOptionItem}>
              <span className="lsOptionText">Children</span>
              <input
                type="number"
                min={0}
                className={styles.lsOptionInput}
                placeholder={data_search.options.children}
                onChange={(e) => {
                  const childrenValue = parseInt(e.target.value);
                  // Cập nhật giá trị children trong data_search khi giá trị thay đổi
                  setData_search((prevData) => ({
                    ...prevData,
                    options: {
                      ...prevData.options,
                      children: childrenValue,
                    },
                  }));
                }}
              />
            </div>

            {/* Trường "Room" */}
            <div className={styles.lsOptionItem}>
              <span className="lsOptionText">Room</span>
              <input
                type="number"
                min={1}
                className={styles.lsOptionInput}
                placeholder={data_search.options.room}
                onChange={(e) => {
                  const roomValue = parseInt(e.target.value);
                  // Cập nhật giá trị room trong data_search khi giá trị thay đổi
                  setData_search((prevData) => ({
                    ...prevData,
                    options: {
                      ...prevData.options,
                      room: roomValue,
                    },
                  }));
                }}
              />
            </div>
          </div>
          <button type="submit" onClick={click_search}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchFrom;
