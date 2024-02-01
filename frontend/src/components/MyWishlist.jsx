/* eslint-disable camelcase */
import { Link } from "react-router-dom";
import { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import { useStoredUser } from "../contexts/UserContext";

import redirect from "../assets/arrow-right.svg";
import defaut from "../assets/default.svg";
import edit from "../assets/edit.svg";
import close from "../assets/close.svg";
import upload from "../assets/upload.png";

export default function MyWishlist({ item, items, setItems }) {
  const { storedUser } = useStoredUser();
  const [modal, setModal] = useState(false);
  const [editItem, setEditItem] = useState({
    name: "",
    website: "",
    url: "",
    image: "",
    price: "",
    user_id: storedUser.id,
    wishlist_id: item.wishlist_id,
  });
  const handleEdit = async () => {
    const formData = new FormData();
    Object.keys(editItem).forEach((key) => {
      formData.append(key, editItem[key]);
    });

    await axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/api/items/${item.id}`,
        formData,
        { withCredentials: true }
      )
      .then((res) => {
        // Trouvez l'index de l'élément modifié dans le tableau d'éléments
        const index = items.findIndex((i) => i.id === item.id);

        const newItems = [...items];

        newItems[index] = res.data;

        setItems(newItems);
      })
      .catch((err) => console.error(err.response));
  };

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setEditItem({
        ...editItem,
        [e.target.name]: e.target.files[0],
      });
    } else
      setEditItem({
        ...editItem,
        [e.target.name]: e.target.value,
      });
  };

  return (
    <>
      <div className="item-container">
        <button type="button" className="edit" onClick={() => setModal(true)}>
          <img src={edit} alt="edit symbole" width={20} />
        </button>
        <div className="item">
          <div className="item-image">
            {item.image ? (
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}${item.image}`}
                alt=""
                width={70}
              />
            ) : (
              <img
                src={defaut}
                alt="symbole de redirection"
                width={30}
                height={20}
              />
            )}
          </div>
          <div className="item-content">
            <h2>{item.name}</h2>
            <small>{item.website}</small>
            <small>{item.price}€</small>
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
      {modal && (
        <div className="wrapper-modal">
          <div className="container-modal">
            <button
              type="button"
              className="close"
              onClick={() => setModal(false)}
            >
              <img src={close} alt="" width={25} />
              <p className="hidden"> fermer</p>
            </button>
            <form action="" className="new-item">
              <label htmlFor="name">Article</label>
              <input
                type="text"
                name="name"
                required="required"
                onChange={handleChange}
                placeholder="paire de chaussures, canapé...s"
              />
              <label htmlFor="name">Site Web</label>
              <input
                type="text"
                name="website"
                required="required"
                onChange={handleChange}
                placeholder="sur quel site avez-vous vu cet article?"
              />
              <label htmlFor="name">URL</label>
              <input
                type="text"
                name="url"
                required="required"
                onChange={handleChange}
                placeholder="url de l'article"
              />
              <label htmlFor="name">Prix</label>
              <input
                type="number"
                name="price"
                required="required"
                onChange={handleChange}
                inputMode="numeric"
                placeholder="0"
              />
              <label htmlFor="input-image" className="input-image">
                <img src={upload} alt="upload" width={50} />
              </label>
              <input
                type="file"
                name="image"
                id="input-image"
                hidden
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => {
                  handleEdit();
                  setModal(false);
                }}
              >
                Valider
              </button>
            </form>
            <button type="button" className="delete">
              Supprimer l'article
            </button>
          </div>
        </div>
      )}
    </>
  );
}

MyWishlist.propTypes = {
  item: PropTypes.arrayOf.isRequired,
};
