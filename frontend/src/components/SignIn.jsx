/* eslint-disable react/jsx-props-no-spreading */
import { React, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useStoredUser } from "../contexts/UserContext";
import { error } from "../services/toast";

export default function SignIn({ setSignedUp }) {
  const { storedUser, setStoredUser } = useStoredUser();

  const [user, setUser] = useState({
    pseudo: "",
    pwd: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/login`,
        user,
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        setStoredUser(res.data.user);
        window.localStorage.setItem("user", JSON.stringify(res.data.user));
      }
    } catch (err) {
      console.error(err);
      if (err.response.status === 422) {
        error("Mot de passe incorrect");
      }
    }
  };
  if (storedUser) {
    return <Navigate to="/" />;
  }
  return (
    <div className="container">
      <form className="auth" method="POST">
        <div className="group-form">
          <label htmlFor="pseudo" id="pseudo">
            Nom d'utilisateur
          </label>
          <input
            name="pseudo"
            type="text"
            placeholder="Nom d'utilisateur"
            onChange={handleChange}
          />
        </div>

        <div className="group-form">
          <label htmlFor="pwd" id="pwd">
            Mot de passe
          </label>
          <input
            type="password"
            name="pwd"
            placeholder="Mot de passe"
            onChange={handleChange}
          />
        </div>

        <button type="submit" onClick={handleSubmit}>
          Se connecter
        </button>
      </form>
      <button
        type="button"
        className="link-button"
        onClick={() => setSignedUp(false)}
      >
        créer un compte
      </button>
    </div>
  );
}
SignIn.propTypes = {
  setSignedUp: PropTypes.func.isRequired,
};
