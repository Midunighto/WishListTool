import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useStoredUser } from "../contexts/UserContext";

import "../styles/wishlists.scss";
import MyWishlist from "../components/MyWishlist";

import add from "../assets/add.svg";
import close from "../assets/close.svg";
import upload from "../assets/upload.png";

export default function Wishlist() {
  const { storedUser } = useStoredUser();
  const [items, setItems] = useState([{}]);
  const [wishlists, setWishlists] = useState([{}]);
  const { id } = useParams();
  const [modal, setModal] = useState(false);
  /* CAL WISHLIST TO GET WISHLIST.NAME */
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/wishlists/${id}`)
      .then((res) => {
        setWishlists(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  /* CALL ITEMS */
  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${
          storedUser.id
        }/wishlists/${id}/items/`
      )

      .then((res) => {
        setItems(res.data);
      })
      .catch((err) => console.error(err));
  }, [items]);

  /* ADD ITEM LOGIC */
  const [newItem, setNewItem] = useState({
    name: "",
    website: "",
    url: "",
    image: "",
    price: "",
    user_id: storedUser.id,
    wishlist_id: id,
  });

  const handleNewItem = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/items`,
        newItem
      );
    } catch (error) {
      console.error(error);
    }
  };
  const handleChange = (e) => {
    setNewItem({
      ...newItem,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="wrapper">
      <h1>{wishlists.name}</h1>
      <div className="list-container">
        <button
          type="button"
          className="add-item"
          onClick={() => setModal(true)}
        >
          <img src={add} alt="symbole plus" width={50} />
          <p className="hidden">ajouter un item</p>
        </button>
        {items.length > 1
          ? items.map((item) => <MyWishlist item={item} />)
          : null}
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
              <input type="file" name="image" id="input-image" hidden />
              <button
                type="button"
                onClick={() => {
                  handleNewItem();
                  setModal(false);
                }}
              >
                Valider
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
