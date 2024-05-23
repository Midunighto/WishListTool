/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useStoredUser } from "../contexts/UserContext";
import { error, success } from "../services/toast";

export default function SignIn() {
  const { storedUser, setStoredUser } = useStoredUser();
  const navigate = useNavigate();

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

    if (!user.pseudo || !user.pwd) {
      error("Merci de remplir tous les champs");
      return;
    }

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

        success("Connexion réussie !");
      }
    } catch (err) {
      console.error(err);

      if (err.response) {
        if (err.response.status === 422) {
          error("Mot de passe incorrect");
        } else if (err.response.status === 401) {
          error("Nom d'utilisateur inexistant");
        }
      } else {
        error("Une erreur s'est produite");
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
        onClick={() => navigate("/signup")}
      >
        Créer un compte
      </button>
    </div>
  );
}
