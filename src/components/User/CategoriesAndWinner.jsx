import React, { useState } from "react";
import Categories from "./Categories";
import SlotGames from "./Categories/SlotGames";
import CasinoGames from "./Categories/CasinoGames";
import SportGames from "./Categories/SportGames";
import FishGames from "./Categories/FishGames";
import BASE_URL from "../../hooks/baseURL";
import useFetch from "../../hooks/useFetch";
import HomeHeroGames from "./Categories/HomeHeroGames";
import ArcadeGames from "./Categories/ArcadeGames";

const CategoriesAndWinner = ({ activeCategory, setActiveCategory }) => {

  return (
    <div className="categoriesAndWinner">
      <Categories
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <div
        style={{ overflowY: "scroll", overflowX: "hidden" }}
        className=""
      >
        {activeCategory === "all" && (
          <ArcadeGames />
        )}
        {/* {activeCategory === "hotgame" && <HomeHeroGames />} */}
        {activeCategory === "Slot" && (
          <SlotGames />
        )}
        {activeCategory === "Live Casino" && (
          <CasinoGames />
        )}
        {activeCategory === "Sport Book" && (
          <SportGames />
        )}
        {activeCategory === "Fishing" && (
          <FishGames />
        )}
      </div>
    </div>
  );
};

export default CategoriesAndWinner;
