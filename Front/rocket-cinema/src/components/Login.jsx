import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Alert, Snackbar } from "@mui/material";
import "../style/Login.css";
import "../style/Background.css";
import { loginSuccess, logout } from "../redux/actions/authActions";

export default function Login() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loggedUser = useSelector((state) => state.auth.user);
  const loggedUsername = sessionStorage.getItem("username");
  const loggedName = sessionStorage.getItem("name");
  const loggedEmail = sessionStorage.getItem("email");

  let [authMode, setAuthMode] = useState("signin");
  let [name, setName] = useState("");
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [showAlert, setShowAlert] = useState(false);
  let [alertSeverity, setAlertSeverity] = useState("success");
  let [alertMessage, setAlertMessage] = useState("");

  const navigate = useNavigate();

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
    setName("");
    setUsername("");
    setEmail("");
    setPassword("");
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (authMode === "signin") {
      dispatch(signInUser(username, password));
    } else {
      dispatch(signUpUser(name, username, email, password));
    }
  };

  const signInUser = (username, password) => {
    return async (dispatch) => {
      try {
        const response = await axios.post("http://localhost:8080/api/auth/login", { username, password });
        console.log("Accesso effettuato:", response.data);
        dispatch(loginSuccess(response.data));
        sessionStorage.setItem("username", response.data.username);
        sessionStorage.setItem("email", response.data.email);
        sessionStorage.setItem("name", response.data.name);
        setAlertSeverity("success");
        setAlertMessage("Login successful, enjoy the site " + response.data.username + "!"); // Restituisce l'username nell'alert
        setShowAlert(true);
        setTimeout(() => {
          handleAlertClose();
          navigate("/home");
        }, 3000);
      } catch (error) {
        console.error("Errore durante l'accesso:", error);
        setAlertSeverity("error");
        setAlertMessage("Error during login, try again!");
        setShowAlert(true);
        setTimeout(() => {
          handleAlertClose();
        }, 3000);
      }
    };
  };

  const signUpUser = (name, username, email, password) => {
    return async (dispatch) => {
      try {
        const response = await axios.post("http://localhost:8080/api/auth/register", { name, username, email, password });
        console.log("Registrazione effettuata:", response.data);
        setAlertSeverity("success");
        setAlertMessage("Registration successful, now you can login!");
        setShowAlert(true);
        setTimeout(() => {
          handleAlertClose();
        }, 3000);
      } catch (error) {
        console.error("Errore durante la registrazione:", error);
        setAlertSeverity("error");
        setAlertMessage("Error during registration, try again!");
        setShowAlert(true);
        setTimeout(() => {
          handleAlertClose();
        }, 3000);
      }
    };
  };

  if (authMode === "signin") {
    return (
      <div className="Auth-form-container">
        <img src="https://i.ibb.co/QjFyyLW/logo3.png" alt="logo3" border="0" className="me-3" />
        <form className="Auth-form" onSubmit={handleSubmit}>
          <div className="Auth-form-content">
            <Snackbar open={showAlert} autoHideDuration={3000} onClose={handleAlertClose}>
              <Alert severity={alertSeverity} icon={false}>
                {alertMessage}
              </Alert>
            </Snackbar>
            <h3 className="Auth-form-title">Login</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Sign up
              </span>{" "}
              now!
            </div>
            <div className="form-group mt-3">
              <label>Username</label>
              <input type="text" className="form-control mt-1" placeholder="Your username" value={username} onChange={handleUsernameChange} />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input type="password" className="form-control mt-1" placeholder="***********" value={password} onChange={handlePasswordChange} />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
            <p className="text-center mt-2 link-primary">Forgot password?</p>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <Snackbar open={showAlert} autoHideDuration={3000} onClose={handleAlertClose}>
            <Alert severity={alertSeverity} icon={false}>
              {alertMessage}
            </Alert>
          </Snackbar>
          <h3 className="Auth-form-title">Register for free!</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" onClick={changeAuthMode}>
              Sign in
            </span>
            .
          </div>
          <div className="form-group mt-3">
            <label>Full Name</label>
            <input type="text" className="form-control mt-1" placeholder="e.g Paolo Fasulli" value={name} onChange={handleNameChange} />
          </div>
          <div className="form-group mt-3">
            <label>Username</label>
            <input type="text" className="form-control mt-1" placeholder="Your username" value={username} onChange={handleUsernameChange} />
          </div>
          <div className="form-group mt-3">
            <label>Email</label>
            <input type="email" className="form-control mt-1" placeholder="Your email" value={email} onChange={handleEmailChange} />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input type="password" className="form-control mt-1" placeholder="***********" value={password} onChange={handlePasswordChange} />
          </div>
          <div className="d-grid gap-2 mt-3 mb-4">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
