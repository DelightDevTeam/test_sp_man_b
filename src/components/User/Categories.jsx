import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import BASE_URL from "../../hooks/baseURL";
import fire from "../../assets/img/categories/fire.png";
import all from "../../assets/img/categories/all.png";

const Categories = ({ activeCategory, setActiveCategory }) => {
  let btnUrl = BASE_URL + "/gameType";
  let { data: games } = useFetch(btnUrl);
  const initialLang = localStorage.getItem("lang");
  const [lan, setLan] = useState(initialLang);

  useEffect(() => {
    setLan(initialLang);
  }, [initialLang]);

  console.log(lan);



  // console.log(games);

  let handleCategory = (name, id) => {
    // console.log(url);
    setActiveCategory(name);
  };

  return (
    <>
      <div className="categories gap-3 d-flex align-items-center justify-content-center mb-5">
        <div onClick={(e) => handleCategory("all", 6)} className="category">
          <img
            className="categoryImg"
            src={all}
            alt="hotgame"
            style={{ width: "30px", height: "40px" }}
          />
          <p className="font-weight-bold mt-2">{lan === "mm" ? "ဂိမ်းအားလုံး" : "ALL GAMES"}</p>
        </div>
        {/* <div onClick={(e) => handleCategory("hotgame", 5)} className="category">
          <img
            className="categoryImg"
            src={fire}
            alt="hotgame"
            style={{ width: "30px", height: "40px" }}
          />
          <p className="font-weight-bold mt-2">HOT GAMES</p>
        </div> */}
        {games &&
          games.map((game, index) => (
            <div
              key={index} // Use game.id instead of index for a unique key
              onClick={(e) => handleCategory(game.name, game.id)}
              className="category"
            >
              <img
                className="categoryImg"
                src={game.img_url}
                alt={game.name} // Add alt attribute for accessibility
              />
              <p className="font-weight-bold mt-2">{lan === "mm" ? game.name_mm : game.name}</p>
            </div>
          ))}
      </div>
    </>
  );
};

export default Categories;
