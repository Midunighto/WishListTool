import { Link, Navigate } from "react-router-dom";
import account from "../assets/account.svg";
import logotxt from "../assets/wantit-text.png";

import "../styles/nav.scss";

export default function Navbar() {
  return (
    <nav>
      <div className="nav-left">
        <Link to="/">
          <img src={logotxt} alt="" width={60} />
        </Link>

        <div />
      </div>
      <ul className="navbar">
        <li>
          <Link to="/my-wishlists">Mes wishlists</Link>
        </li>
        <li>
          <Link>
            <img src={account} alt="account logo" width={20} />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
