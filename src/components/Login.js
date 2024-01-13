import React, { useRef, useEffect, useState, useContext } from "react";
import AuthContext from "../context/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

const Login = ({ onLoginSuccess }) => {
  //const { setAuth } = useAuth(false);
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const errRef = useRef();

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("Manager");

  const [formData, setFormData] = useState({
    UserType: selectedOption,
    Username: "",
    Password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    //console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(formData);
    try {
      const res = await axios.post("https://localhost:7182/Login/", formData);
      //console.log(res);
      if (res.status === 200) {
        sessionStorage.setItem("Username", res.data.fullName);
        sessionStorage.setItem("UserId", res.data.id);
        sessionStorage.setItem("UserTypeId", res.data.userTypeId);
        setSuccess(true);
        onLoginSuccess(true);
        setAuth(true);

        console.log(setAuth);
        console.log(res.data.userTypeId);
        if (res.data.userTypeId === 1) {
          navigate("/Dashboard", { replace: true });
          //navigate("/POS", { replace: true });
        } else {
          navigate("/POS", { replace: true });
        }
      } else {
        if (res.status === 404) {
          setErrMsg("Log in failed");
        } else if (res.status === 400) {
          setErrMsg("Missing username or password");
        } else if (res.status === 401) {
          setErrMsg("Unauthorized");
        }
        setSuccess(false);
        onLoginSuccess(false);
      }
    } catch (error) {
      if (error?.response?.status === 404) {
        setErrMsg("Log in failed");
      } else if (error?.response?.status === 400) {
        setErrMsg("Missing username or password");
      } else if (error?.response?.status === 401) {
        setErrMsg("Unauthorized");
      }

      setFormData({
        UserType: selectedOption,
        Username: "",
        Password: "",
      });
      errRef.current.focus();
      onLoginSuccess(false);
    }
  };

  const getUserTypes = async () => {
    try {
      const res = await axios.get("https://localhost:7182/GetUserTypes");
      //console.log(res);
      setOptions(await res.data);
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  };

  useEffect(() => {
    setErrMsg("");
    getUserTypes();
  }, []);

  return (
    <>
      {/* {success ? (
        <Products />
      ) : ( */}
      <section>
        <div
          className="row d-flex justify-content-center"
          style={{ paddingTop: 200 }}
        >
          <div className="card">
            <div className="card-header bg-success-origin">
              <div className="card-title">
                <label className="text-secondary">Login Details</label>
              </div>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <select
                    value={formData.UserType}
                    className="form-control"
                    name="UserType"
                    onChange={handleChange}
                  >
                    {options.map((option) => (
                      <option key={option.id} value={option.description}>
                        {option.description}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    name="Username"
                    autoComplete="off"
                    onChange={handleChange}
                    value={formData.Username}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    name="Password"
                    onChange={handleChange}
                    value={formData.Password}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="submit"
                    className="btn btn-block btn-secondary btn-md"
                    defaultValue="Login"
                  />
                </div>
              </form>
              <p
                ref={errRef}
                className={errMsg ? "text-danger text-center" : "offscreen"}
                aria-live="assertive"
              >
                {errMsg}
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* )} */}
    </>
  );
};

export default Login;
