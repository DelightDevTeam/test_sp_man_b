import React, { useEffect, useState } from "react";
import "../../assets/css/navbar.css";
import logo from "../../assets/img/logo.png";
import { Link, useNavigate } from "react-router-dom";
import BASE_URL from "../../hooks/baseURL";
import BtnSpinner from "../Auth/BtnSpinner";
import useFetch from "../../hooks/useFetch";

const Navbar = () => {
  let auth = localStorage.getItem("token");
  let [lan, setLan] = useState(localStorage.getItem("lang"));
  let [url, setUrl] = useState(BASE_URL + "/user");
  const {data:user} = useFetch(url);

  useEffect(() => {
    setUrl(BASE_URL + "/user");
  }, [url]);

  let navigate = useNavigate();
  let [smallLoad, setSmallLoad] = useState(false);


  const logOut = (e) => {
    e.preventDefault();
    setSmallLoad(true);
    //fetch api for logout url
    fetch(BASE_URL + "/logout", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Logout failed");
        }
        setSmallLoad(true);
        return response.json();
      })
      .then((data) => {
        localStorage.removeItem("token");
        localStorage.removeItem("authUser");
        // alert("Logged Out Successfully.");
        setSmallLoad(false);
        navigate("/login");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  const language = (e) => {
    e.preventDefault(); 
    let currentLang = localStorage.getItem("lang");
    let lang = currentLang === "mm" ? "en" : "mm";
    localStorage.setItem("lang", lang);
    setLan(localStorage.getItem('lang'));
    window.location.reload();
  };

  // console.log(lan);

  return (
    <>
    {!auth && (
      <>
        <div className="navbar d-flex justify-content-between justify-content-lg-center">
          <Link to={"/"}>
            <img className="logo " src={logo} />
          </Link>

          <Link to={"/login"} className="loginBtn text-decoration-none">
            Login
          </Link>
        </div>
      </>
    )}
    {auth && (
      <>
        <div className="navbar d-flex justify-content-between">
          <div>
            <Link to={"/"} className="text-decoration-none">
              <img className="logo d-none d-md-inline" src={logo} />
              <img className="d-md-none d-sm-inline" src={logo} width={60} />
              <span className="text-white ms-3 d-none d-md-inline">Spider-Man</span>
            </Link>
          </div>
          {/* mobile */}
          <div className="d-md-none d-sm-block">
            <div className="d-flex justify-content-end align-items-center">
              <div className="me-2">
                <div className="d-flex">
                  <span className="d-block">MM</span>
                  <i
                    className={`fas fa-toggle-${lan === "mm" ? "off" : "on"} d-block mx-2`}
                    onClick={language}
                    style={{ cursor: "pointer", fontSize: "20px" }}
                  ></i>
                  <span className="d-block">EN</span>
                </div>
              </div>
              <div>
                <a onClick={logOut} style={{ cursor: "pointer" }} className="p-2 text-white">
                  {smallLoad && <BtnSpinner />}
                  <i className="fas fa-right-from-bracket"></i>
                </a>
              </div>
            </div>
          </div>

          {/* mobile */}
          {/* desktop */}
          <div className="d-none d-md-flex justify-content-center align-items-center">
            <div className="me-3 d-flex">
              <span className="d-block">MM</span>
              <i
                className={`fas fa-toggle-${lan === "mm" ? "off" : "on"} d-block mx-2`}
                onClick={language}
                style={{ cursor: "pointer", fontSize: "20px" }}
              ></i>
              <span className="d-block">EN</span>
            </div>
            <div className="px-2 py-1 me-2 m-auto">
              <Link
                to="/profile"
                className="text-decoration-none text-white me-3 text-center"
              >
                <i
                  className="fa-regular fa-user-circle me-2"
                  style={{ fontSize: "20px" }}
                ></i>
                <span>{user?.user_name}</span>
              </Link>
              <span className="text-white">
                <i className="fas fa-wallet me-2"></i>
                  K{parseFloat(user?.balance).toLocaleString()}
              </span>
              
            </div>
            <a onClick={logOut} style={{ cursor: "pointer" }} className="p-2 text-white btn btn-sm btn-outline-light">
              {smallLoad && <BtnSpinner />}
              <i className="fas fa-right-from-bracket me-2"></i>
              Logout
            </a>
          </div>
          {/* desktop */}
        </div>
        
        <div className="d-md-none d-sm-block">
        <hr className="pb-0 mb-0" />
          <div className="d-flex justify-content-between align-items-center pt-3 px-3">
              <div>
                <Link to="/profile" className="text-decoration-none text-white me-3 text-center">
                  <i className="fa-regular fa-user-circle me-2" style={{ fontSize: "20px" }}></i>
                  <span>{user?.user_name}</span>
                </Link>
              </div>
              <div>
                  <span className="text-white">
                    <i className="fas fa-wallet me-2"></i>
                      K{parseFloat(user?.balance).toLocaleString()}
                  </span>
              </div>
          </div>
        </div>

      </>
    )}


    </>
  );
};

export default Navbar;
