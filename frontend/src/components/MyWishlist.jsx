import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import redirect from "../assets/arrow-right.svg";
import edit from "../assets/edit.svg";
import defaut from "../assets/default.svg";

export default function MyWishlist({ item }) {
  return (
    <div className="item-container">
      <button type="button" className="edit">
        <img src={edit} alt="edit symbole" width={20} />
      </button>
      <div className="item">
        <div className="item-image">
          <img src={defaut} alt="" width={70} />
        </div>
        <div className="item-content">
          <h2>{item.name}</h2>
          <small>{item.website}</small>
          <Link to={item.url}>
            <img
              src={redirect}
              alt="symbole de redirection"
              width={30}
              height={20}
            />
          </Link>
        </div>
      </div>
      <div className="line" />
    </div>
  );
}

MyWishlist.propTypes = {
  item: PropTypes.arrayOf.isRequired,
};
