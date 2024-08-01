import React, { useEffect, useState } from "react";
import "../../assets/css/user/home.css";
import CategoriesAndWinner from "../../components/User/CategoriesAndWinner";
import Banner from "../../components/User/Banner";
import HeroSideBar from "../../components/User/HeroSidebar";
import { useAuthContext } from "../../contexts/AuthContext";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("all");

  return (
    <>
      <div className="hero">
        <Banner />
        <HeroSideBar />
      </div>
      <div style={{ position: "sticky" }}>
        <CategoriesAndWinner
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
      </div>
    </>
  );
}
