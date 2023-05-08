import React, { useState } from "react";
import axios from "axios";
import "../style/Login.css";
import "../style/Background.css";

export default function Login() {
  let [authMode, setAuthMode] = useState("signin");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [fullName, setFullName] = useState("");

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (authMode === "signin") {
      // Effettua la chiamata per l'accesso
      signInUser(email, password);
    } else {
      // Effettua la chiamata per la registrazione
      signUpUser(fullName, email, password);
    }
  };

  const signInUser = async (email, password) => {
    try {
      const response = await axios.post("/api/login", { email, password });
      // Effettua le operazioni necessarie dopo l'accesso
      console.log("Accesso effettuato:", response.data);
    } catch (error) {
      console.error("Errore durante l'accesso:", error);
    }
  };

  const signUpUser = async (fullName, email, password) => {
    try {
      const response = await axios.post("/api/signup", { fullName, email, password });
      // Effettua le operazioni necessarie dopo la registrazione
      console.log("Registrazione effettuata:", response.data);
    } catch (error) {
      console.error("Errore durante la registrazione:", error);
    }
  };
  if (authMode === "signin") {
    return (
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={handleSubmit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Login</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Sign up
              </span>{" "}
              now!
            </div>
            <div className="form-group mt-3">
              <label>Email</label>
              <input type="email" className="form-control mt-1" placeholder="youremail@example.com" />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input type="password" className="form-control mt-1" placeholder="***********" />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
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
            <input type="text" className="form-control mt-1" placeholder="e.g Paolo Fasulli" />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input type="email" className="form-control mt-1" placeholder="youremail@example.com" />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input type="password" className="form-control mt-1" placeholder="***********" />
          </div>
          <div className="d-grid gap-2 mt-3 mb-4">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
