import { useEffect, useState } from "react";

import styles from "./DetailSelect.module.css";

const DetailSelect = (props) => {
  const [rooms, setRooms] = useState([]);

  // lấy dữ liệu các phòng có trong khách sạn từ component cha 
  useEffect(() => {
    const data = props.rooms;
    setRooms(data);
  }, [props]);

  // các phòng được chọn
  const [selectedRooms, setSelectedRooms] = useState({});
  // tổng số phòng
  const [totalSelected, setTotalSelected] = useState(0);
  //tổng tiền
  const [totalPrice, setTotalPrice] = useState(0);

  
  // khi thay đổi thông tin về selectedRooms , totalSelected , totalPrice 
  // thay đổi thì sẽ gọi lại useEffect để truyền dữ liệu sang component cha
  useEffect(() => {
    props.onChange({ selectedRooms, totalSelected, totalPrice });
  }, [selectedRooms, totalSelected, totalPrice]);

  // mỗi khi chọn hoặc hủy chọn
  const handleCheckboxChange = (roomId, isChecked, price) => {
    setSelectedRooms((prevSelected) => {
      if (Array.isArray(prevSelected)) {
        // Nếu prevSelected là mảng, sử dụng nó; nếu không, tạo một mảng mới
        let updatedSelection;

        if (isChecked) {
          // Thêm roomId vào mảng nếu được chọn
          updatedSelection = [...prevSelected, roomId];
        } else {
          // Xóa roomId khỏi mảng theo index nếu không được chọn
          const index = prevSelected.indexOf(roomId);
          if (index !== -1) {
            updatedSelection = [
              ...prevSelected.slice(0, index),
              ...prevSelected.slice(index + 1),
            ];
          } else {
            updatedSelection = prevSelected;
          }
        }
        // Sắp xếp mảng tăng dần
        updatedSelection.sort((a, b) => a - b);

        return updatedSelection;
      } else {
        // Nếu prevSelected không phải là mảng, tạo một mảng mới
        return isChecked ? [roomId] : [];
      }
    });

    // xem phòng nào được chọn
    setTotalSelected((prevTotal) =>
      isChecked ? prevTotal + 1 : prevTotal - 1
    );

    // Tính tổng tiền khi checkbox thay đổi
    setTotalPrice((prevTotalPrice) =>
      isChecked ? prevTotalPrice + price : prevTotalPrice - price
    );
  };

  return (
    <>
      <div className={styles.Selecthotels}>
        <h1>Select Rooms</h1>
        <div className={styles.Selecthotels_info}>
          {rooms.length >= 1 &&
            rooms.map((value) => (
              <div key={value._id} className={styles.item}>
                <div>
                  <p className={styles.title}>{value.title}</p>
                  <p>{value.desc}</p>
                  <p>Max people: {value.maxPeople}</p>
                  <p>$ {value.price}</p>
                </div>
                <div className={styles.checkBox}>
                  {value.roomNumbers.map((room) => (
                    <div className={styles.checkBox_item} key={room}>
                      <label htmlFor={room}>{room}</label>
                      <input
                        type="checkbox"
                        id={room}
                        name={room}
                        defaultChecked={selectedRooms[room] || false}
                        onChange={(e) =>
                          handleCheckboxChange(
                            room,
                            e.target.checked,
                            value.price
                          )
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default DetailSelect;
