import { Link, Navigate } from "react-router-dom";
import { useStoredUser } from "../contexts/UserContext";

import account from "../assets/account.svg";
import logotxt from "../assets/wantit-text.png";

import "../styles/nav.scss";

export default function Navbar() {
  const { storedUser } = useStoredUser();

  return (
    <nav>
      <div className="nav-left">
        <Link to="/">
          <img src={logotxt} alt="" width={60} />
        </Link>

        <div />
      </div>
      <ul className="navbar">
        {storedUser && (
          <li id="nav-wishlists">
            <Link to="/my-wishlists">Mes wishlists</Link>
          </li>
        )}
        <li
          id="account"
          style={storedUser ? null : { flexGrow: 1, textAlign: "end" }}
        >
          <Link to="/account">
            <img src={account} alt="account logo" width={20} />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
