import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import useFetch from "../../hooks/useFetch";
import BASE_URL from "../../hooks/baseURL";

const Hero = () => {
  const { data: bannerText } = useFetch(BASE_URL + '/bannerText');

  return (
    <div className="hero">
      <marquee>
        {bannerText && bannerText.text}
      </marquee>
      <Navbar />
    </div>
  );
};

export default Hero;
