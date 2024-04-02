import { Link } from "react-router-dom";
import { useStoredUser } from "../contexts/UserContext";

import "../styles/home.scss";

import logo from "../assets/wantit.png";
import darklogo from "../assets/logo-darkmode.png";

export default function Home() {
  const { storedUser } = useStoredUser();

  return (
    <div className="wrapper">
      <div className="container">
        <h1 className="title">WANT-IT !</h1>
        <small>Créateur de wishlist</small>
        <p>
          Ajoutez facilement des produits provenant de différents sites sur une
          seule liste, simplifiant ainsi votre expérience d'achat en ligne.
          Comparez, partagez et organisez vos envies en un seul endroit.
        </p>

        <img src={storedUser.theme === 2 ? darklogo : logo} alt="" width={50} />

        {storedUser ? (
          <h2>
            Bienvenue, <span>{storedUser.pseudo}</span>
          </h2>
        ) : (
          <div className="links">
            <Link to="/signup">créer un compte</Link>
            <Link to="/signin">j'ai déjà un compte</Link>
          </div>
        )}
      </div>
    </div>
  );
}
