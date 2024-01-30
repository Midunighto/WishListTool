import { Link } from "react-router-dom";

import "../styles/home.scss";

export default function Home() {
  return (
    <div className="wrapper">
      <div className="container">
        <h1>TROUVER UN TITRE ET UN LOGO</h1>
        <p>
          Explorez et rassemblez vos coups de cœur en ligne en toute simplicité
          avec notre outil de wishlist universelle. Ajoutez facilement des
          produits provenant de différents sites sur une seule liste,
          simplifiant ainsi votre expérience d'achat en ligne. omparez, partagez
          et organisez vos envies en un seul endroit, transformant ainsi votre
          expérience d'achat en ligne en un jeu d'enfant.
        </p>
        <div className="links">
          <Link to="/signup">créer un compte</Link>
          <Link to="/signin">j'ai déjà un compte</Link>
        </div>
      </div>
    </div>
  );
}
