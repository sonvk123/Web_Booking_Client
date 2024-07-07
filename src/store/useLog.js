import { useEffect, useState } from "react";

export const useLog = (input_register, log, click) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetch_Log = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/${log}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input_register), // Gửi dữ liệu data_search dưới dạng JSON
      });
      if (!response.ok) {
        const errorData = await response.json();
        const message = errorData.message;
        setError(message);
      }
      const data = await response.json(); // Chuyển dữ liệu từ JSON sang đối tượng JavaScript
      setData(data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetch_Log();
  }, [click]);

  return {
    data,
    error,
    loading,
    fetch_Log,
  };
};
