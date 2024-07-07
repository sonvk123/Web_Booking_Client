import { useState, useContext, useEffect, useRef } from "react";
import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format, parseISO, startOfDay } from "date-fns";
import { useNavigate } from "react-router-dom";

import {DataContext} from "../../../store/DataProvider";

const Header = ({ type }) => {
  const { addDataSearch } = useContext(DataContext);
  const navigate = useNavigate();

  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);

  const create_date = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate() - 1;
    return `${year}-${month < 10 ? "0" : ""}${month}-${
      day < 10 ? "0" : ""
    }${day}T17:00:00.000Z`;
  };
  const newDate = create_date();

  const [date, setDate] = useState([
    {
      startDate: startOfDay(parseISO(newDate)),
      endDate: startOfDay(parseISO(newDate)),
      key: "selection",
    },
  ]);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const [isLogin, setIsLogin] = useState(false);

  const refDate = useRef(null);
  const refPeople = useRef(null);

  // Lấy giá trị vào localStorage
  const LocalStorage = (name) => {
    return JSON.parse(localStorage.getItem(name));
  };
  // Lưu  giá trị vào localStorage

  const saveLocalStorage = (name, value) => {
    localStorage.setItem(name, JSON.stringify(value));
  };

  // xem đã đăng nhập chưa
  useEffect(() => {
    setIsLogin(LocalStorage("isLogin"));
  }, []);

  const khiNhanBenNgoai = (e) => {
    if (
      refDate.current &&
      !refDate.current.contains(e.target) &&
      refPeople.current &&
      !refPeople.current.contains(e.target)
    ) {
      setOpenDate(false);
      setOpenOptions(false);
    }
  };

  const khiNhanESC = (e) => {
    if (e.key === "Escape") {
      setOpenDate(false);
      setOpenOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", khiNhanBenNgoai, true);
    document.addEventListener("keydown", khiNhanESC, true);

    return () => {
      document.removeEventListener("click", khiNhanBenNgoai, true);
      document.removeEventListener("keydown", khiNhanESC, true);
    };
  }, []);

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const handleSearch = () => {
    const state = { destination, date, options };
    saveLocalStorage("state", state);
    navigate("/search", { state: { destination, date, options } });
    addDataSearch(state);
  };

  const click_Login = () => {
    navigate("/login");
  };

  return (
    <div className="header">
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        <div className="headerList">
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faCar} />
            <span>Car rentals</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faBed} />
            <span>Attractions</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport taxis</span>
          </div>
        </div>
        {type !== "list" && (
          <>
            <h1 className="headerTitle">
              A lifetime of discounts? It's Genius.
            </h1>
            <p className="headerDesc">
              Get rewarded for your travels – unlock instant savings of 10% or
              more with a free account
            </p>
            {!isLogin && (
              <button className="headerBtn" onClick={click_Login}>
                Sign in / Register
              </button>
            )}
            <div className="headerSearch">
              {/* City */}
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faBed} className="headerIcon" />
                <input
                  type="text"
                  placeholder="Where are you going?"
                  className="headerSearchInput"
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              {/* ngày tháng  */}
              <div className="headerSearchItem" ref={refDate}>
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="headerSearchText"
                >{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
                  date[0].endDate,
                  "MM/dd/yyyy"
                )}`}</span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    moveRangeOnFirstSelection={false}
                    onChange={(item) => {
                      setDate([item.selection]);
                    }}
                    className="date"
                    ranges={date}
                    minDate={startOfDay(parseISO(newDate))}
                  />
                )}
              </div>
              {/* số người  */}
              <div className="headerSearchItem" ref={refPeople}>
                <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                <span
                  onClick={() => setOpenOptions(!openOptions)}
                  className="headerSearchText"
                >{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>
                {openOptions && (
                  <div className="options">
                    <div className="optionItem">
                      <span className="optionText">Adult</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.adult <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.adult}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Children</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.children <= 0}
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.children}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Room</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.room <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.room}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="headerSearchItem">
                <button className="headerBtn" onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
