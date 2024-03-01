import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useStoredUser } from "../contexts/UserContext";

import "../styles/wishlists.scss";
import Items from "../components/Items";
import SignIn from "../components/SignIn";

import add from "../assets/add.svg";
import close from "../assets/close.svg";
import upload from "../assets/upload.png";

export default function Wishlist() {
  const { storedUser, refreshUser } = useStoredUser();
  const [items, setItems] = useState([]);
  const [wishlists, setWishlists] = useState([{}]);
  const [reloadData, setReloadData] = useState(false);
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
    const loadData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/${
            storedUser.id
          }/wishlists/${id}/items/`
        );
        setItems(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    loadData();
  }, [reloadData]);

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

  const handleSubmitNewItem = async () => {
    const formData = new FormData();
    for (const key in newItem) {
      if (Object.prototype.hasOwnProperty.call(newItem, key)) {
        formData.append(key, newItem[key]);
      }
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/items`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setItems([...items, response.data]);
      setReloadData((prev) => !prev);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setNewItem({
        ...newItem,
        [e.target.name]: e.target.files[0],
      });
    } else
      setNewItem({
        ...newItem,
        [e.target.name]: e.target.value,
      });
  };

  return (
    <div className="wrapper">
      {storedUser ? (
        <>
          <h1>{wishlists.name}</h1>
          <div className="list-container">
            <button
              type="button"
              className="add-item"
              onClick={() => {
                setModal(true);
              }}
            >
              <img src={add} alt="symbole plus" width={50} />
              <p className="hidden">ajouter un item</p>
            </button>

            {items.length > 0 &&
              items.map((item) => (
                <Items
                  item={item}
                  setItems={setItems}
                  items={items}
                  handleChange={handleChange}
                  storedUser={storedUser}
                />
              ))}
          </div>
          {/*     {console.info(items[0].length)} */}
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
                      handleSubmitNewItem();
                      setModal(false);
                    }}
                  >
                    Valider
                  </button>
                </form>
              </div>
            </div>
          )}
        </>
      ) : (
        <SignIn />
      )}
    </div>
  );
}
