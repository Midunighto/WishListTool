/* eslint-disable react/jsx-props-no-spreading */
import { React, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import { success, error } from "../services/toast";

export default function SignUp({ setSignedUp }) {
  const [user, setUser] = useState({
    pseudo: "",
    email: "",
    pwd: "",
  });
  const [password, setPassword] = useState({
    confirmPwd: "",
  });
  const [created, setCreated] = useState(false);
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  };

  const handleRealSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users`,
        user,
        {
          withCredentials: true,
        }
      );
      if (res.status === 201) {
        success("Compte créée avec succès");
        setCreated(true);
      }

      console.info(res.status);
    } catch (err) {
      if (err.response) {
        if (err.response.status === 409) {
          error("L'email ou pseudo existe déjà");
        }
        if (err.response.status === 400) {
          error("Merci de remplir tous les champs");
        }
      } else {
        console.error(err);
      }
    }
  };
  if (created) {
    return <Navigate to="/signin" />;
  }
  return (
    <div className="container">
      <form
        className="auth"
        onSubmit={handleRealSubmit}
        method="post"
        action="/signin"
      >
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
          <label htmlFor="email" id="email">
            Adresse e-mail
          </label>
          <input
            name="email"
            type="email"
            placeholder="Email"
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
        <div className="group-form">
          <label htmlFor="confirmPwd" id="confirmPwd">
            Confirmer le mot de passe
          </label>
          <input
            type="password"
            name="confirmPwd"
            placeholder="Confirmer le mot de passe"
            onChange={handleChange}
          />
        </div>

        <button type="submit">S'inscrire</button>
      </form>
      <button
        type="button"
        className="link-button"
        onClick={() => setSignedUp(true)}
      >
        j'ai déjà un compte
      </button>
    </div>
  );
}
SignUp.propTypes = {
  setSignedUp: PropTypes.func.isRequired,
};
