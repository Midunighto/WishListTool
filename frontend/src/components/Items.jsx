/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable camelcase */
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import { useStoredUser } from "../contexts/UserContext";

import redirect from "../assets/arrow-right.png";
import defaut from "../assets/default.svg";
import edit from "../assets/edit.svg";
import close from "../assets/close.svg";
import upload from "../assets/upload.png";
import SignIn from "./SignIn";
import ValidateItem from "./ValidateItem";

export default function Items({ item, setItems }) {
  const { storedUser } = useStoredUser();
  const [modal, setModal] = useState(false);
  const [validate, setValidate] = useState(false);

  const [editItem, setEditItem] = useState({
    name: item.name,
    website: item.website,
    url: item.url,
    price: item.price,
    user_id: storedUser.id,
    wishlist_id: item.wishlist_id,
  });

  /*   useEffect(() => {
    setEditItem({
      name: item.name,
      website: item.website,
      url: item.url,
      price: item.price,
      user_id: storedUser.id,
      wishlist_id: item.wishlist_id,
    });
  }, [item, storedUser.id]); */

  const handleEdit = async () => {
    const formData = new FormData();
    Object.keys(editItem).forEach((key) => {
      if (key !== "image" || (key === "image" && editItem[key] !== undefined)) {
        formData.append(key, editItem[key]);
      }
    });

    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/items/${item.id}`,
        formData,
        { withCredentials: true }
      );

      setItems((prevItems) =>
        prevItems.map((i) =>
          i.id === item.id
            ? { ...editItem, image: item.image } // Update the item with the new image
            : i
        )
      );
      setModal(false);
    } catch (err) {
      console.error(err.response);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files.length > 0) {
      setEditItem({
        ...editItem,
        [name]: files[0],
      });
    } else if (name !== "image") {
      setEditItem({
        ...editItem,
        [name]: value,
      });
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/items/${item.id}`
      );
      setItems((prevItems) => prevItems.filter((i) => i.id !== item.id));
      setModal(false);
    } catch (err) {
      console.error(err.response);
    }
  };

  const handleClick = () => {
    setModal(true);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {storedUser ? (
        <>
          <div className="item-container" key={item.id}>
            <button
              type="button"
              className="edit"
              onClick={() => handleClick()}
            >
              <img src={edit} alt="edit symbole" width={20} />
            </button>
            <h2>{item.name}</h2>
            <div className="item">
              <div className="item-image">
                {item.image ? (
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}${item.image}`}
                    alt=""
                    width={70}
                  />
                ) : (
                  <img src={defaut} alt="" width={70} />
                )}
              </div>
              <div className="item-content">
                <small>{item.website}</small>
                <small>{item.price}€</small>
                <Link to={item.url} target="_blank">
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
                    value={editItem.name}
                    required="required"
                    onChange={handleChange}
                    placeholder="paire de chaussures, canapé..."
                  />
                  <label htmlFor="name">Site Web</label>
                  <input
                    type="text"
                    name="website"
                    value={editItem.website}
                    required="required"
                    onChange={handleChange}
                    placeholder="sur quel site avez-vous vu cet article?"
                  />
                  <label htmlFor="name">URL</label>
                  <input
                    type="number"
                    name="url"
                    value={editItem.url}
                    required="required"
                    onChange={handleChange}
                    placeholder="url de l'article"
                  />
                  <label htmlFor="name">Prix</label>
                  <input
                    type="number"
                    name="price"
                    value={editItem.price}
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
                  <button type="button" onClick={handleEdit}>
                    Valider
                  </button>
                </form>
                <button
                  type="button"
                  className="delete"
                  onClick={() => {
                    /*   handleDelete(item.id); */
                    setValidate(true);
                  }}
                >
                  Supprimer l'article
                </button>
              </div>
            </div>
          )}
          {validate && (
            <ValidateItem
              item={item}
              handleDelete={handleDelete}
              setValidate={setValidate}
              setModal={setModal}
            />
          )}
        </>
      ) : (
        <SignIn />
      )}
    </>
  );
}

Items.propTypes = {
  item: PropTypes.arrayOf.isRequired,
  setItems: PropTypes.func.isRequired,
};
