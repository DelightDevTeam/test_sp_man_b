import React, { useContext, useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import BASE_URL from "../../hooks/baseURL";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function GameHistory() {
  let auth = localStorage.getItem("token");
  let lan = localStorage.getItem("lang");
  let navigate = useNavigate();
    useEffect(() => {
      if (!auth) {
        navigate("/login");
      }
    }, [navigate]);
  
  const [url, setUrl] = useState("/wager-logs?type=");
  const [param, setParam] = useState("today");
  const {data: logs, loading, error} = useFetch(BASE_URL+url+param);


  return (
    <>
      <ToastContainer />
      <div className="container my-5">
        <h3 className="text-center mb-4">{lan === "mm" ? "ဂိမ်းမှတ်တမ်း" : "Game Logs"}</h3>
        <div className="d-flex mb-3">
                <button 
                className={`btn btn-sm btn-outline-primary m-md-2 m-1 ${param == "today" ? "active" : ""}`}
                onClick={()=>setParam("today")}
                >{lan === "mm" ? "ယနေ့" : "Today"}</button>
                <button 
                className={`btn btn-sm btn-outline-primary m-md-2 m-1 ${param == "yesterday" ? "active" : ""}`}
                onClick={()=>setParam("yesterday")}
                >{lan === "mm" ? "မနေ့က" : "Yesterday"}</button>
                <button 
                className={`btn btn-sm btn-outline-primary m-md-2 m-1 ${param == "this_week" ? "active" : ""}`}
                onClick={()=>setParam("this_week")}
                >{lan === "mm" ? "ယခုအပတ်" : "This Week"}</button>
                <button 
                className={`btn btn-sm btn-outline-primary m-md-2 m-1 ${param == "last_week" ? "active" : ""}`}
                onClick={()=>setParam("last_week")}
                >{lan === "mm" ? "အရင်အပတ်" : "Last Week"}</button>
            </div>

            {logs && (
            <div className="table-responsive text-center">
                <table className="table table-primary">
                    <thead className="">
                        <tr>
                            <th>{lan === "mm" ? "နံပါတ်" : "No"}</th>
                            <th>{lan === "mm" ? "ဂိမ်းအခြေအနေ" : "Game Result"}</th>
                            <th>{lan === "mm" ? "ပမာဏ (ကျပ်)" : "Amount (Ks)"}</th>
                            <th>{lan === "mm" ? "အချိန်" : "Time"}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            loading && (
                                <div className="text-center text-white mt-3">
                                    loading....
                                </div>
                            
                            )
                        }
                        {logs && logs.map((log, index)=>(
                            <tr key={index}>
                                <td>{++index}</td>
                                <td className={`${log.status == "win" ? "text-success" : "text-danger"}`}>{log.status.toUpperCase()}</td>
                                <td>{parseFloat(log.amount).toLocaleString()}</td>
                                <td>{log.datetime}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {logs.length == 0 && (
                    <p className='text-center text-danger'>Data များ မရှိသေးပါ။</p>
                )}
            </div>
            )}
      </div>
    </>
  );
}
