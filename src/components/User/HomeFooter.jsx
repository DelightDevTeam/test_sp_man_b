import React from "react";
import { Link } from "react-router-dom";

const HomeFooter = () => {
  let lan = localStorage.getItem('lang');

  const footer = [
    { icon: <i className="fa-solid fa-home"></i>, title: "Home", title_mm: "ပင်မ" },
    { icon: <i className="fa-solid fa-lock"></i>, title: "Password", title_mm: "လျို့ဝှက်နံပါတ်" },
    { icon: <i className="fa-solid fa-bullhorn"></i>, title: "Promotion", title_mm: "ပရိုမိုးရှင်း" },
    { icon: <i className="fa-solid fa-gamepad"></i>, title: "Game Logs", title_mm: "ဂိမ်းမှတ်တမ်း" },
    { icon: <i className="fa-solid fa-history"></i>, title: "History", title_mm: "မှတ်တမ်း" },
  ];
  return (
    <div className="homeFooter d-flex d-lg-none justify-content-between align-items-center">
      {lan=== "en" && (
        footer.map((item) => {
          return (
            <Link
              to={
                item.title === "Home"
                  ? "/"
                  : item.title === "Password"
                  ? "/password"
                  : item.title == "Promotion"
                  ? "/promotion"
                  : item.title == "Game Logs"
                  ? "/game_logs"
                  : "/history"
              }
              key={item.title}
              className="footerItem text-decoration-none pt-2"
            >
              {item.icon}
              <p className="mt-2">{item.title}</p>
            </Link>
          );
        })
      )}
      {lan=== "mm" && (
        footer.map((item) => {
          return (
            <Link
              to={
                item.title_mm === "ပင်မ"
                  ? "/"
                  : item.title_mm === "လျို့ဝှက်နံပါတ်"
                  ? "/password"
                  : item.title_mm == "ပရိုမိုးရှင်း"
                  ? "/promotion"
                  : item.title_mm == "ဂိမ်းမှတ်တမ်း"
                  ? "/game_logs"
                  : "/history"
              }
              key={item.title}
              className="footerItem text-decoration-none pt-2"
            >
              {item.icon}
              <p className="mt-2">{item.title_mm}</p>
            </Link>
          );
        })
      )}
    </div>
  );
};

export default HomeFooter;
