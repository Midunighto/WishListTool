/* eslint-disable react/jsx-props-no-spreading */
import axios from "axios";
import React from "react";
import { useState } from "react";

import "./App.css";

function App() {
  const [user, setUser] = useState({
    pseudo: "",
    email: "",
    pwd: "",
  });

  /*  const handleChange = (e) => {
    if (e.target.name === "image") {
      //BIEN APPELER L'INPUT FILE "IMAGE"
      setUser({
        ...user,
        [e.target.name]: e.target.files[0],
      });
    } else
      setUser({
        ...user,
        [e.target.name]: e.target.value,
      });
  }; */
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleRealSubmit = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users`,
        user
        /*    { withCredentials: true } */
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <form>
          <input
            name="pseudo"
            type="text"
            placeholder="Nom d'utilisateur"
            onChange={handleChange}
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
          />
          <input
            type="password"
            name="pwd"
            placeholder="Mot de passe"
            onChange={handleChange}
          />

          <input type="submit" onClick={handleRealSubmit} />
        </form>
      </header>
    </div>
  );
}

export default App;
