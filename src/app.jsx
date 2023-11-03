import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameR, setUsernameR] = useState("");
  const [passwordR, setPasswordR] = useState("");
  const [email, setEmail] = useState("");
  const [register, setRegister] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [character, setCharacter] = useState({});

  const axiosInstance = axios.create({
    withCredentials: true,
  });

  useEffect(() => {
    checkLoggedIn();
  }, []);

  const checkLoggedIn = () => {
    axiosInstance
      .get("https://login-auth-xqc9.onrender.com/getCharacter")
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
      .post("https://login-auth-xqc9.onrender.com/login", { username, password })
      .then(() => checkLoggedIn())
      .catch(() => console.log("Login failed"));
  };

  const registerR = (event) => {
    event.preventDefault();

    axiosInstance
      .post(
        "https://login-auth-xqc9.onrender.com/register",
        { usernameR, email, passwordR },
        { withCredentials: true }
      )
      .then(() => console.log("User registered"))
      .catch(() => console.log("Registration failed"));
  };

  return (
    <>
      {loggedIn ? (
        <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
          <h1>Welcome user!</h1>

          <div className="flex flex-wrap justify-center">
            <div
              className="m-4 bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl"
            >
              <img
                className="h-96 w-full object-cover"
                src={character.image}
                alt={character.name}
              />
              <div className="p-8">
                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                  Name: {character.name}
                </div>
                <p className="text-gray-500">Status: {character.status}</p>
                <p className="text-gray-500">Species: {character.species}</p>
                <p className="text-gray-500">Gender: {character.gender}</p>
              </div>
            </div>
          </div>
          <button
            className="m-4 p-2 bg-blue-500 text-white rounded shadow hover:bg-blue-400 focus:outline-none focus:shadow-outline"
            onClick={async () => {
              checkLoggedIn();
            }}
          >
            Shuffle Character
          </button>
          <button
            className="p-2 bg-blue-500 text-white rounded shadow hover:bg-blue-400 focus:outline-none focus:shadow-outline"
            onClick={async () => {
              await axios.post(
                "https://login-auth-xqc9.onrender.com/logout",
                {},
                { withCredentials: true }
              );
              checkLoggedIn();
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <>
          {register ? (
            <RegisterForm
              register={registerR}
              setUsernameR={setUsernameR}
              setPasswordR={setPasswordR}
              setEmail={setEmail}
              setRegister={setRegister}
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
