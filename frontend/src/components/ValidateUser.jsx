import PropTypes from "prop-types";

import close from "../assets/close.svg";
import { success } from "../services/toast";

export default function ValidateUser({
  setModal,
  handleDelete,
  storedUser,
}) {
  return (
    <div className="wrapper-modal">
      <div className="container-modal" id="validate">
        <button type="button" className="close" onClick={() => setModal(false)}>
          <img src={close} alt="" width={25} />
          <p className="hidden"> fermer</p>
        </button>
        <div className="validate-content">
          <h1>Voulez-vous vraiment supprimer votre compte ? </h1>
          <small>Attention, cette action est irréversible</small>
          <div className="button-row">
            <button
              className="validate-button"
              type="button"
              onClick={() => {
                setModal(false);
                handleDelete(storedUser.id);
                success(`Votre compte a été supprimé avec succès`);
              }}
            >
              Oui
            </button>
            <button
              className="validate-button"
              type="button"
              onClick={() => setModal(false)}
            >
              Non
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

ValidateUser.propTypes = {
  setModal: PropTypes.func.isRequired,
};
