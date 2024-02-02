import PropTypes from "prop-types";

import close from "../assets/close.svg";

export default function AddWishList({
  setAddNewWishlist,
  handleSubmit,
  handleChange,
}) {
  return (
    <div className="wrapper-modal">
      <div className="container-modal">
        <button
          type="button"
          className="close"
          onClick={() => setAddNewWishlist(false)}
        >
          <img src={close} alt="" width={25} />
          <p className="hidden"> fermer</p>
        </button>
        <form action="" className="new-list">
          <label htmlFor="name">Nom de la wishlist</label>
          <input
            type="text"
            name="name"
            required="required"
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={() => {
              handleSubmit();
              setAddNewWishlist(false);
            }}
          >
            Valider
          </button>
        </form>
      </div>
    </div>
  );
}

AddWishList.propTypes = {
  setAddNewWishlist: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
