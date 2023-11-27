import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Navbar from "./components/navbar";
import Products from "./components/products";
import Sales from "./components/sales";




function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameR, setUsernameR] = useState("");
  const [passwordR, setPasswordR] = useState("");
  const [email, setEmail] = useState("");
  const [register, setRegister] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [character, setCharacter] = useState({});
  const [telefono, setTelefono] = useState("");

  const axiosInstance = axios.create({
    withCredentials: true,
  });

  useEffect(() => {
    checkLoggedIn();
  }, []);

  const checkLoggedIn = () => {
    axiosInstance
      .get("https://login-auth-xqc9.onrender.com/api/auth/getCharacter")
      .then((res) => {
        setLoggedIn(true);
        setCharacter(res.data);
      })
      .catch(() => {
        setLoggedIn(false);
        setCharacter({});
      });
  };

  const login = (event) => {
    event.preventDefault();

    axiosInstance
      .post("https://login-auth-xqc9.onrender.com/api/auth/login", { username, password }, { withCredentials: true })
      .then(() => checkLoggedIn())
      .catch(() => console.log("Login failed"));
  };

  const registerR = (event) => {
    event.preventDefault();

    axiosInstance
      .post(
        "https://login-auth-xqc9.onrender.com/api/auth/register",
        { usernameR, email, passwordR, telefono },
        { withCredentials: true }
      )
      .then(() => console.log("User registered"))
      .catch(() => console.log("Registration failed"));
  };

  return (  
    <>
      {loggedIn ? (
        <Products/>
      ) : (
        <>
          {register ? (
            <RegisterForm
              register={registerR}
              setUsernameR={setUsernameR}
              setPasswordR={setPasswordR}
              setEmail={setEmail}
              setRegister={setRegister}
              setTelefono={setTelefono}
            />
          ) : (
            <LoginForm
              login={login}
              setUsername={setUsername}
              setPassword={setPassword}
              setRegister={setRegister}
            />
          )}
        </>
      )}
    </>
  );
}

export default App;
