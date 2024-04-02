import PropTypes from "prop-types";

import close from "../assets/close.svg";
import closeDark from "../assets/close-darkmode.svg";

import { success } from "../services/toast";

export default function ValidateWishlist({
  setValidate,
  handleDelete,
  wishlist,
  storedUser,
}) {
  return (
    <div className="wrapper-modal">
      <div className="container-modal" id="validate">
        <button
          type="button"
          className="close"
          onClick={() => setValidate(false)}
        >
          <img
            src={storedUser.theme === 2 ? closeDark : close}
            alt=""
            width={25}
          />
          <p className="hidden"> fermer</p>
        </button>
        <div className="validate-content">
          <h1>Voulez-vous vraiment supprimer la wishlist {wishlist.name}? </h1>
          <div className="button-row">
            <button
              className="validate-button"
              type="button"
              onClick={() => {
                setValidate(false);
                handleDelete(wishlist.id);
                success(
                  `La wishlist ${wishlist.name} a été supprimée avec succès`
                );
              }}
            >
              Oui
            </button>
            <button
              className="validate-button"
              type="button"
              onClick={() => setValidate(false)}
            >
              Non
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

ValidateWishlist.propTypes = {
  setValidate: PropTypes.func.isRequired,
};
