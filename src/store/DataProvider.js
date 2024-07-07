import { useReducer, useEffect, createContext } from "react";

const defaultDataState = {
  dataSearch: [],
  isLogin: JSON.parse(localStorage.getItem("isLogin")) || false,
  User: JSON.parse(localStorage.getItem("User")) || "",
};

export const DataContext = createContext(defaultDataState);

const dataReducer = (state, action) => {
  if (action.type === "addDataSearch") {
    const newdataSearch = action.state;
    return {
      ...state,
      dataSearch: newdataSearch,
    };
  }
  if (action.type === "Login") {
    return {
      ...state,
      isLogin: true,
      User: action.state,
    };
  }
  if (action.type === "Logout") {
    return {
      ...state,
      isLogin: false,
      User: "",
    };
  }
  return state;
};

const DataProvider = (props) => {
  const [dataState, dispatchDataAction] = useReducer(
    dataReducer,
    defaultDataState
  );

  const addDataSearch = (state) => {
    dispatchDataAction({ type: "addDataSearch", state: state });
  };
  const LOGIN = (state) => {
    dispatchDataAction({ type: "Login", state: state });
  };
  const LOGOUT = (state) => {
    dispatchDataAction({ type: "Logout", state: state });
  };

  useEffect(() => {
    localStorage.setItem("isLogin", JSON.stringify(dataState.isLogin));
    localStorage.setItem("User", JSON.stringify(dataState.User));
  }, [dataState.isLogin, dataState.User]);

  const dataContext = {
    dataSearch: dataState.dataSearch,
    addDataSearch,
    LOGIN,
    LOGOUT,
    isLogin: dataState.isLogin,
    User: dataState.User,
  };

  return (
    <DataContext.Provider value={dataContext}>
      {props.children}
    </DataContext.Provider>
  );
};

export default DataProvider;
