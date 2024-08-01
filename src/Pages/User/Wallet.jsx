import React, { useContext, useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import BASE_URL from "../../hooks/baseURL";
import BtnSpinner from "../../components/Auth/BtnSpinner";
import axios from "axios";
import { useAuthContext } from "../../contexts/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useNavigate } from "react-router-dom";

export default function Wallet() {
  const { authenticated, setAuthenticated } = useAuthContext();

  const navigate = useNavigate();

  if (!authenticated) {
    navigate("/login");
  }

  let [url, setUrl] = useState(BASE_URL + "/wallet/currentWallet");

  const form = useForm({
    mode: "onTouched",
  });
  const form2 = useForm();
  const form3 = useForm();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = form;
  const {
    register: register2,
    control: control2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 },
    reset: reset2,
  } = form2;

  const {
    register: register3,
    control: control3,
    handleSubmit: handleSubmit3,
    formState: { errors: errors3 },
    reset: reset3,
  } = form3;

  const [wallet, setWallet] = useState(null);
  const [providers, setProviders] = useState(null);

  const { wallets, setWallets } = useAuthContext();

  const [user, setUser] = useState();

  useEffect(() => {
    setWallets(wallet);
  }, [wallet]);

  // useEffect(() => {
  //   if (authenticated) {
  //     setUser(JSON.parse(localStorage.getItem("authUser")).userData);
  //   }
  // }, []);

  // const { data: providers } = useFetch(url1);

  const [provider, setProvider] = useState("");
  const [bank, setInputBank] = useState("");
  // console.log(wallets);
  const [amount, setAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [data, setData] = useState(null);
  const [loader, setLoader] = useState(false);
  const [banks, setBank] = useState();
  const [authUsera, setAuthUser] = useState();
  const [isDeposite, setIsDeposite] = useState(null);
  const [transferLogs, setTransferLogs] = useState();

  const getProvider = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    };
    axios
      .get(BASE_URL + "/providers", { headers })
      .then((response) => {
        setProviders(response.data.data);
      })
      .catch((e) => console.log(e));
  };

  const getList = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    };
    axios
      .get(BASE_URL + "/wallet/currentWallet", { headers })
      .then((response) => setWallet(response.data.data));
  };

  const getBank = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    };
    axios
      .get(BASE_URL + "/bank/all", { headers })
      .then((response) => {
        setBank(response.data.data);
      })
      .catch((e) => console.log(e));
  };

  const getAuthUser = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    };
    axios
      .get(BASE_URL + "/user", { headers })
      .then((response) => {
        setUser(response.data.data);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getList();
    getProvider();
    getBank();
  }, []);

  useEffect(() => {
    getAuthUser();
  }, [wallet]);

  const deposite = (depositeData) => {
    const formData = { p_code: provider, cash_in: amount };

    setLoader(true);
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    };
    axios
      .post(BASE_URL + "/transaction/deposit", depositeData, { headers })
      .then((response) => {
        if (response.status == 200) {
          let wallet = response.data;
          getList();
          setLoader(false);
          reset();

          toast.success("Deposite Successfully", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const withdraw = (withdrawData) => {
    const formData = { user_bank_id: bank, amount: withdrawAmount };

    const headers = {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    };
    axios
      .post(BASE_URL + "/transaction/withdraw", withdrawData, { headers })
      .then((response) => {
        if (response.status == 200) {
          let wallet = response.data;
          getList();
          setLoader(false);
          reset2();
          toast.success("Withdraw Successfully", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      });
  };

  const transferLog = (transferLogData) => {
    console.log(transferLogData);

    transferLogData.type == "deposit"
      ? setIsDeposite(true)
      : setIsDeposite(false);
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    };
    axios
      .get(
        BASE_URL +
          `/transaction/player-transactionlog?type=${transferLogData.type}&fromDate=${transferLogData.fromDate}&toDate=${transferLogData.toDate}`,
        { headers }
      )
      .then((response) => {
        console.log(response);

        setTransferLogs(response.data.data);
      });
  };

  return (
    <>
      <ToastContainer />
      <div className="container-fluid my-5 pb-5">
        <h3 className="text-center mb-4">My Wallet</h3>
        <div className="row">
          <div className="col-md-3">
            <div className="bg-transparent border border-1 p-2 px-3 rounded-3 shadow d-none d-md-block">
              {wallet && (
                <>
                  <div className="d-flex justify-content-between">
                    <span>WALLET</span>
                    <span>K{parseFloat(user?.balance).toLocaleString()}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>ASIAGAMING</span>
                    <span>{wallet.ag_wallet}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>GAMEPLAY</span>
                    <span>{wallet.g8_wallet}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>BBIN</span>
                    <span>{wallet.gb_wallet}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>JDB</span>
                    <span>{wallet.jd_wallet}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>JOKER</span>
                    <span>{wallet.jk_wallet}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>KING855</span>
                    <span>{wallet.k9_wallet}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>NEW LIVE22</span>
                    <span>{wallet.l4_wallet}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>PGSOFT</span>
                    <span>{wallet.pg_wallet}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>PRAGMATIC</span>
                    <span>{wallet.pr_wallet}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>KING MAKER</span>
                    <span>{wallet.re_wallet}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>SBO</span>
                    <span>{wallet.s3_wallet}</span>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="col-md-9">
            <div className="bg-transparent border border-1 py-3 px-3 rounded-3 shadow mb-4">
              <h5 className="mb-4">
                Deposit (ငွေသွင်းရန်)
                <span className="badge text-bg-info">{data}</span>
              </h5>
              <form onSubmit={handleSubmit(deposite)}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="p_code" className="form-label">
                        ဂိမ်းအမျိုးအစား ရွေးချယ်ပါ
                      </label>
                      <select
                        className={`form-select ${
                          errors.p_code && "border-2 border-danger"
                        }`}
                        id="p_code"
                        {...register("p_code", {
                          required: "Provider Code is Required.",
                        })}
                      >
                        <option value="">ကျေးဇူးပြု၍ ရွေးချယ်ပါ</option>
                        {providers &&
                          providers.map((provider, index) => (
                            <option key={index} value={provider.p_code}>
                              {provider.description}
                            </option>
                          ))}
                      </select>
                      <div className="error text-danger">
                        {errors.p_code?.message}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="amount" className="form-label">
                        ငွေပမာဏ ထည့်ပါ
                      </label>
                      <input
                        type="number"
                        placeholder="ငွေပမာဏ ထည့်ပါ"
                        className={`form-control ${
                          errors.cash_in && "border-2 border-danger"
                        } `}
                        {...register("cash_in", {
                          required: "Amount is Required.",
                          min: {
                            value: 1000,
                            message: "Sorry amount can't be below 1000",
                          },
                        })}
                      />
                      <div className="error text-danger">
                        {errors.cash_in?.message}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-end">
                  <button className="btn btn-red" type="submit">
                    {loader && <BtnSpinner />}
                    ငွေသွင်းမည်
                  </button>
                </div>
              </form>
            </div>
            <div className="bg-transparent border border-1 py-3 px-3 rounded-3 shadow mb-4">
              <h5 className="mb-4">Withdraw (ငွေထုတ်ရန်)</h5>
              <form onSubmit={handleSubmit2(withdraw)}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="p_code" className="form-label">
                        ဘဏ် ရွေးချယ်ပါ
                      </label>
                      <select
                        className={`form-label form-select ${
                          errors2.bank_id && "border-2 border-danger"
                        }`}
                        id="bank"
                        {...register2("bank_id", {
                          required: "Bank is Required.",
                        })}
                      >
                        <option value="">ကျေးဇူးပြု၍ ရွေးချယ်ပါ</option>
                        {banks &&
                          banks.map((bank, index) => (
                            <option key={index} value={bank.id}>
                              {bank.name}
                            </option>
                          ))}
                      </select>
                      <div className="error text-danger">
                        {errors2.bank_id?.message}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="amount" className="form-label">
                        ငွေပမာဏ ထည့်ပါ
                      </label>
                      <input
                        type="number"
                        placeholder="ငွေပမာဏ ထည့်ပါ"
                        className={`form-control ${
                          errors2.amount && "border-2 border-danger"
                        }`}
                        {...register2("amount", {
                          required: "Amount is Required.",
                        })}
                      />
                      <div className="error text-danger">
                        {errors2.amount?.message}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="acc_name" className="form-label">
                        ဘဏ်အ‌ကောင့်အမည် ထည့်ပါ
                      </label>
                      <input
                        type="text"
                        id="acc_name"
                        placeholder="ဘဏ်အ‌ကောင့်အမည် ထည့်ပါ"
                        className={`form-control ${
                          errors2.account_name && "border-2 border-danger"
                        }`}
                        {...register2("account_name", {
                          required: "Account Name is Required.",
                        })}
                      />
                      <div className="error text-danger">
                        {errors2.account_name?.message}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="acc_no" className="form-label">
                        ဘဏ်အ‌ကောင့်နံပါတ် ထည့်ပါ
                      </label>
                      <input
                        type="text"
                        id="acc_no"
                        placeholder="ဘဏ်အ‌ကောင့်နံပါတ် ထည့်ပါ"
                        className={`form-control ${
                          errors2.account_no && "border-2 border-danger"
                        }`}
                        {...register2("account_no", {
                          required: "Account Number is Required.",
                        })}
                      />
                      <div className="error text-danger">
                        {errors2.account_no?.message}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-end">
                  <button className="btn btn-red">ငွေထုတ်မည်</button>
                </div>
              </form>
            </div>
            <div className="bg-transparent border border-1 py-3 px-3 rounded-3 shadow">
              <h5 className="mb-4">
                Transfer History (ငွေလွဲငွေ‌ထုတ်မှတ်တမ်း)
              </h5>
              <form onSubmit={handleSubmit3(transferLog)}>
                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="p_code" className="form-label">
                        အမျိုးအစား ရွေးချယ်ပါ
                      </label>
                      <select
                        className={`form-label form-select ${
                          errors3.type && "border-2 border-danger"
                        }`}
                        id="type"
                        {...register3("type", {
                          required: "Type is Required.",
                        })}
                      >
                        <option value="">ကျေးဇူးပြု၍ ရွေးချယ်ပါ</option>
                        <option value="deposit">Deposit</option>
                        <option value="withdraw">Withdraw</option>
                      </select>
                      <div className="error text-danger">
                        {errors3.type?.message}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="amount" className="form-label">
                        မှ
                      </label>
                      <input
                        type="date"
                        placeholder="ငွေပမာဏ ထည့်ပါ"
                        className={`form-control ${
                          errors3.fromDate && "border-2 border-danger"
                        }`}
                        {...register3("fromDate", {
                          required: "fromDate is Required.",
                        })}
                      />
                      <div className="error text-danger">
                        {errors3.fromDate?.message}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="acc_name" className="form-label">
                        ထိ
                      </label>
                      <input
                        type="date"
                        id="toDate"
                        placeholder="ဘဏ်အ‌ကောင့်အမည် ထည့်ပါ"
                        className={`form-control ${
                          errors2.toDate && "border-2 border-danger"
                        }`}
                        {...register3("toDate", {
                          required: "toDate  is Required.",
                        })}
                      />
                      <div className="error text-danger">
                        {errors3.toDate?.message}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-end">
                  <button className="btn btn-red">တင်သွင်းမည်</button>
                </div>
              </form>
              {transferLogs && (
                <table className="table table-borderless mt-3">
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">
                        {isDeposite ? "Depsite" : "Withdraw"} Amount
                      </th>
                      <th scope="col">Transaction time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transferLogs &&
                      transferLogs.map((transferLog, index) => (
                        <tr key={index} className="p-2">
                          <th>{transferLog.id}</th>
                          <td>{transferLog.amount}</td>
                          <td>{transferLog.created_at}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
