import { Link } from "react-router-dom";

import "../styles/home.scss";

import logo from "../assets/wantit.png";

export default function Home() {
  return (
    <div className="wrapper">
      <div className="container">
        <h1>WANT-IT !</h1>
        <small>Créateur de wishlist</small>
        <p>
          Ajoutez facilement des produits provenant de différents sites sur une
          seule liste, simplifiant ainsi votre expérience d'achat en ligne.
          Comparez, partagez et organisez vos envies en un seul endroit.
        </p>
        <img src={logo} alt="" width={50} />

        <div className="links">
          <Link to="/signup">créer un compte</Link>
          <Link to="/signin">j'ai déjà un compte</Link>
        </div>
      </div>
    </div>
  );
}
