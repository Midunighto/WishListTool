import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useStoredUser } from "../contexts/UserContext";

import "../styles/wishlists.scss";
import MyWishlist from "../components/MyWishlist";

import add from "../assets/add.svg";

export default function Wishlist() {
  const { storedUser } = useStoredUser();
  const [items, setItems] = useState([{}]);
  const [wishlists, setWishlists] = useState([{}]);
  const { id } = useParams();

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

  return (
    <div className="wrapper">
      <h1>{wishlists.name}</h1>
      <div className="list-container">
        <button type="button" className="add-item">
          <img src={add} alt="symbole plus" width={50} />
          <p className="hidden">ajouter un item</p>
        </button>
        {items.length > 0
          ? items.map((item) => <MyWishlist item={item} />)
          : null}
      </div>
    </div>
  );
}
