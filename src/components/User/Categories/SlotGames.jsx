import React, { useState } from "react";
import BtnSpinner from "../../Auth/BtnSpinner";
import { Link } from "react-router-dom";
import BASE_URL from "../../../hooks/baseURL";
import useFetch from "../../../hooks/useFetch";

const SlotGames = () => {
  const [url, setUrl] = useState(BASE_URL + '/allGameProducts');
  const { data: games, loading } = useFetch(url);
  const slots = games[0]?.products;
  const slotCode = games[0]?.code;
  
  let auth = localStorage.getItem("token");
  const lan = localStorage.getItem("lang");

  const launchGame = (productId, gameType) => {
    if(!auth){
      navigate('/login');
    }else{
      let gameData = {
        productId: productId,
        gameType: gameType,
      }
  
      fetch(BASE_URL + "/game/Seamless/LaunchGame", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(gameData)
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Launch Game failed");
          }
          console.log("Launch Game success");
          return response.json();
        })
        .then((data) => {
          window.open(data.Url, '_blank');
        })
        .catch((error) => {
          console.error("Launch Game error:", error);
        });
    }

  };

  return (
    <div className="container mt-3">
      {loading && <BtnSpinner />}
      <div className="mb-4">
        <h3 className="mb-3">{lan === "mm" ? "စလော့" : "SLOTS"}</h3>
        <div className="row">
        {slots && slots.map((game, index) => (
            <div className="col-md-2 col-4 mb-3 mx-0 px-1" key={index}>
              <Link
                key={game.id}
                className='w-100'
                onClick={(e) => {
                  e.preventDefault();
                  launchGame(game.code, slotCode)}
                }
              >
                <img
                  className={`img-fluid rounded-3 shadow gameImg w-100 h-auto`}
                  src={game.imgUrl}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SlotGames;
