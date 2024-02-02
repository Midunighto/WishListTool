import PropTypes from "prop-types";

import close from "../assets/close.svg";

export default function ValidateWishlist({
  setValidate,
  handleDelete,
  wishlist,
}) {
  return (
    <div className="wrapper-modal">
      <div className="container-modal" id="validate">
        <button
          type="button"
          className="close"
          onClick={() => setValidate(false)}
        >
          <img src={close} alt="" width={25} />
          <p className="hidden"> fermer</p>
        </button>
        <div className="validate-content">
          <h1>Voulez-vous vraiment supprimer cette wishlist? </h1>
          <div className="button-row">
            <button
              className="validate-button"
              type="button"
              onClick={() => {
                setValidate(false);
                handleDelete(wishlist.id);
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
