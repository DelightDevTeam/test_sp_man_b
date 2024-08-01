import React, { useState } from "react";
import "../../assets/css/user/promotion.css";
import BASE_URL from "../../hooks/baseURL";
import useFetch from "../../hooks/useFetch";
import BtnSpinner from "../../components/Auth/BtnSpinner";
import PromotionDetail from "./PromotionDetail";


const Promotion = () => {
  const [detail, setDetail] = useState(false);
  const [url, setUrl] = useState(BASE_URL+ "/promotion");
  let { data: promotions, loading, error } = useFetch(url);
  console.log(promotions);

  return (
    <>
    <div className="container">
      <div className="row">
        {loading && <BtnSpinner />}
        {!detail && promotions && promotions.map((promotion, index)=> (
          <div className="col-md-4" key={index}>
            <div className="promotion" style={{ marginTop: 50, padding: 10 }}>
              <div className="card border-0 shadow mt-2">
                <img
                  src={promotion.img_url}
                  className="card-img-top img-fluid"
                  alt="..."
                />
                <div className="card-body">
                  <p className="card-text mb-4">
                    {promotion.title}
                  </p>
                  <div className="text-center">
                    <button
                    onClick={() => 
                      {
                        setDetail(true), 
                        setUrl(BASE_URL+ "/promotion/"+ promotion.id)
                      }}
                    className="card-btn text-decoration-none text-white">
                      ပိုမိုသိရှိရန်
                      <i className="fas fa-arrow-right ms-2"></i>
                    </button>
                    {/* <a href="#" className="card-btn text-decoration-none text-white">
                      ပိုမိုသိရှိရန်
                      <svg
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                      >
                        <path
                          d="M729.6 448H128v85.333333h601.6L597.333333 665.6l59.733334 59.733333 234.666666-234.666666L661.333333 256l-59.733333 59.733333 128 132.266667z"
                          fill="currentColor"
                        />
                      </svg>
                    </a> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        {detail && (
          <>
          <PromotionDetail url={url}/>
          </>
        )
        }
      </div>
    </div>
    </>
  );
};

export default Promotion;
