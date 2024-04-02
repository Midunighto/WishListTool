import { Link, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useStoredUser } from "../contexts/UserContext";

import account from "../assets/account.svg";
import darkaccount from "../assets/account-darkmode.svg";
import logotxt from "../assets/wantit-text.png";
import darklogotxt from "../assets/wantit-text-dark.png";

import "../styles/nav.scss";

export default function Navbar() {
  const { storedUser } = useStoredUser();

  return (
    <nav>
      <div className="nav-left">
        <Link to="/">
          <img
            src={storedUser.theme === 2 ? darklogotxt : logotxt}
            alt="Home"
            width={60}
          />
        </Link>

        <div className="line" />
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
            <img
              src={storedUser.theme === 2 ? darkaccount : account}
              alt="account logo"
              width={20}
            />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
