import React from "react";

import Navbar from "./Home_Navbar/Navbar";
import Header from "./Home_Header/Header";
import HomeImage from "./Home_Image/HomeImage";
import HomeFrom from './Home_From/HomeFrom';
import HomeFooter from './Home_Footer/HomeFooter';


const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <HomeImage />
      <HomeFrom />
      <HomeFooter />
    </div>
  );
};

export default Home;
