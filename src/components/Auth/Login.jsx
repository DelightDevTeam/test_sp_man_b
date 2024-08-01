import React, { useState, useEffect } from "react";
import "./Login.css";
import logo from "../../assets/img/logo.png";
import { Link, useNavigate } from "react-router-dom";
import BASE_URL from "../../hooks/baseURL";
import SmallSpinner from "../spinner/SmallSpinner";

export default function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState('')

  const auth = localStorage.getItem("token");
  const navigate = useNavigate();


  const login = (e) => {
    e.preventDefault();
    setLoading(true);
    const loginData = {
      user_name: name,
      password: password
    };

    fetch(BASE_URL + '/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    })
      .then(async (response) => {
        if (!response.ok) {
          const errData = await response.json();
          setError(errData.errors)
          setLoading(false);
          throw new Error("Log In Failed");
        }
        return response.json();
      })
      .then((responseData) => {
        // console.log(responseData);
        if (responseData) {
          const userData = responseData.data;
          console.log('userData', userData);
          if (userData.is_changed_password == 0) {
            localStorage.setItem("user_id", responseData.data.id);
            localStorage.setItem("is_changed_password", responseData.data.is_changed_password);
            navigate("/changePassword");
            return;
          }
          localStorage.setItem("token", responseData.data.token);
          localStorage.setItem(
            "authUser",
            JSON.stringify({
              userData,
            })
          );

        } else {
          throw new Error("Token not found in response");
        }
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        if (error) {
          setErrMsg("Phone Or Password is incorrect!");
          setLoading(false);
        }
      });
  }

  useEffect(() => {
    if (auth) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <>
      <div className="text-white homeBody">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 offset-lg-4">
              <div className="border border-1 rounded-3 shadow-lg p-4 loginCard">
                <div className="text-center mb-4 me-4">
                  <Link to={"/"}>
                    <img className="logo" src={logo} />
                  </Link>
                </div>

                <h5 className="text-center mb-4">
                  Welcome To Spider-Man Slot
                </h5>
                <div className="card-body">
                  {errMsg && (
                    <div className="alert alert-danger text-white">
                      *{errMsg}
                    </div>
                  )}
                  <form role="form" className="text-start" onSubmit={login}>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">Name</label>
                      <input type="text" id="name" name='name' value={name} onChange={(e) => setName(e.target.value)} className="form-control" placeholder="Enter Username" />
                      {error?.user_name && (
                        <div className="text-danger">*{error?.user_name}</div>
                      )}
                    </div>

                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">Password</label>
                      <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Enter Password" />
                      {error?.password && (
                        <span className="text-danger">*{error?.password}</span>
                      )}
                    </div>
                    <div className="text-center">
                      <button type="submit" className="btn btn-light w-100 my-4 mb-2 py-2">
                        {loading && <SmallSpinner />}
                        Sign in
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
