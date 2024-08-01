import React, { useEffect, useState } from "react";
import "../../assets/css/navbar.css";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../hooks/baseURL";
import useFetch from "../../hooks/useFetch";
import { Alert } from "react-bootstrap";
import SmallSpinner from "../../components/spinner/SmallSpinner";


const Profile = () => {
  let auth = localStorage.getItem("token");
  let lan = localStorage.getItem("lang");
  const navigate = useNavigate();
  if (!auth) {
    navigate("/login");
  }
  const { data: authUser } = useFetch(BASE_URL + "/user");
  const[user, setUser] = useState(authUser);
  const [name, setName] = useState(user?.name);
  const [phone, setPhone] = useState(user?.phone);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setUser(authUser);
    setName(authUser.name)
    setPhone(authUser.phone);
  }, [authUser]);




  const updateProfile = (e) => {
    e.preventDefault();
    setLoader(true);
    const inputData = {
      phone: phone,
      name: name,
    };
    fetch(BASE_URL + "/profile", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(inputData),
    })
    .then(async (response) => {
      if (!response.ok) {
        setLoader(false);
        let errorData;
        try {
          errorData = await response.json();
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
        if (response.status === 422) {
          setError(errorData.errors);
          console.error(`${response.status}:`, errorData);
        } else if (response.status === 401) {
          setError(errorData.message);
          console.error(`${response.status}:`, errorData);
        } else {
          console.error(`Unexpected error with status ${response.status}`);
        }
      }
      return response.json();
    })
    .then((data) => {
      // console.log(data);
      setLoader(false);
      setUser(data.data)
      console.log(data.data);
      setSuccess("Profile Updated Successfully.");
      setTimeout(() => {
        setSuccess("");
      }, 1000);
      
    })
    .catch((error) => {
      console.error(error);
    });
  }

  return (
    <>
      {auth && (
        <div className="container">
          <div className="row">
            <div className="col-lg-4 offset-lg-4 col-md-6 offset-md-3">
            {success && <Alert variant="success">{success}</Alert>}
              <div style={{ paddingBottom: 200 }} className="pt-2">
                <div className="container">
                  <form onSubmit={updateProfile}>
                    <div className="d-flex justify-content-between mb-4">
                      <p className="mt-3">
                        <span className="fw-500 ms-2">
                          {user.name}
                        </span>
                      </p>
                      <p className="mt-3">
                        <i
                          className="fas fa-wallet text-white"
                          style={{ fontSize: "20px" }}
                        ></i>
                        <span className="fw-500 ms-2">
                          K {parseFloat(user?.balance).toLocaleString()}
                        </span>
                      </p>
                    </div>
                    
                    <div className="form-group mb-3">
                      <input
                          className="form-control"
                          type="text"
                          placeholder="Enter Username"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                        {error?.name && (
                          <span className="text-danger d-block">*{error.name}</span>
                        )}
                    </div>

                    <div className="form-group mb-4">
                      <input
                          className="form-control"
                          type="number"
                          placeholder=""
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                      />
                        {error?.phone && (
                          <span className="text-danger d-block">*{error.phone}</span>
                        )}
                    </div>

                    <div className="form-group my-2 float-end">
                      <button type="submit" className="loginBtn text-white">
                        {loader && <SmallSpinner />}
                        {lan==="mm" ? "ပြောင်းမည်" : "Change"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
