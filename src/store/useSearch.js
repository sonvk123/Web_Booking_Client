import { useEffect, useState } from "react";

export const useSearch = (type, url, method, searchData) => {
  const [searchResult, setSearchResult] = useState({
    data: [],
    hotel: [],
    rooms: [],
    error: null,
    loading: true,
  });

  let urlBe =
    process.env.REACT_APP_NODE_ENV === "production"
      ? `${process.env.REACT_APP_URL_BE}`
      : "http://localhost:5000/";

  const fetch_api = async (type, url, method, searchData) => {
    const apiUrl = `${urlBe}search/${url}`;
    try {
      const response = await fetch(
        apiUrl,
        method === "post"
          ? {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(searchData),
            }
          : null
      );
      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();
      if (type === "Detail") {
        setSearchResult({
          data,
          hotel: data.data.Hotel[0],
          rooms: data.data.Rooms,
          error: null,
          loading: false,
        });
      } else if (type === "RoomsTime") {
        setSearchResult({
          data,
          hotel: [],
          rooms: data.data,
          error: null,
          loading: false,
        });
      }
    } catch (error) {
      setSearchResult({
        data: [],
        hotel: [],
        rooms: [],
        error: `API request error: ${error}`,
        loading: false,
      });
    }
  };

  useEffect(() => {
    fetch_api(type, url, method, searchData);
  }, [type, url, method, searchData]);

  return {
    ...searchResult,
    fetch_api,
  };
};
