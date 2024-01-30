import { Link } from "react-router-dom";
import account from "../assets/account.svg";

import "../styles/nav.scss";

export default function Navbar() {
  return (
    <nav>
      <ul className="navbar">
        <li>
          <Link>Mes wishlists</Link>
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
