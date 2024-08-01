import React, { useState } from 'react'
import BtnSpinner from "../../Auth/BtnSpinner";
import useFetch from '../../../hooks/useFetch';
import BASE_URL from '../../../hooks/baseURL';
import { Link } from 'react-router-dom';

const FishGames = () => {
  const [url, setUrl] = useState(BASE_URL + '/allGameProducts');
  const { data: games, loading } = useFetch(url);
  const lan = localStorage.getItem("lang");
  
  const fishes = games[3]?.products;
  const fishCode = games[3]?.code;

  let auth = localStorage.getItem("token");

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
        <h3 className="mb-3">{lan === "mm" ? "ငါးဖမ်းခြင်း" : "FISHING"}</h3>
        <div className="row">
        {fishes && fishes.map((game, index) => (
            <div className="col-md-2 col-4 mb-3 p-1" key={index}>
              <Link
                key={game.id}
                className='w-100'
                onClick={(e) => {
                  e.preventDefault();
                  launchGame(game.code, fishCode)}
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
  )
}

export default FishGames
