/* eslint-disable react/jsx-props-no-spreading */
import { React, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

export default function SignIn({ setSignedUp }) {
  const [user, setUser] = useState({
    pseudo: "",
    email: "",
    pwd: "",
  });

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
    <div className="container">
      <form className="auth">
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

        <button type="submit" onClick={handleRealSubmit}>
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
