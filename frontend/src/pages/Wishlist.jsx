import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useStoredUser } from "../contexts/UserContext";

import "../styles/wishlists.scss";
import Items from "../components/Items";
import SignIn from "../components/SignIn";
import { error } from "../services/toast";

import add from "../assets/add.svg";
import close from "../assets/close.svg";
import closeDark from "../assets/close-darkmode.svg";
import upload from "../assets/upload.png";

export default function Wishlist() {
  const { storedUser } = useStoredUser();
  const [items, setItems] = useState([]);
  const [wishlists, setWishlists] = useState([{}]);
  const [reloadData, setReloadData] = useState(false);
  const { id } = useParams();
  const [modal, setModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  /* CAL WISHLIST TO GET WISHLIST.NAME */
  useEffect(() => {
    if (storedUser) {
      const loadData = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/users/${
              storedUser.id
            }/wishlists/${id}/items/`
          );
          setItems(response.data);
        } catch (err) {
          console.error(err);
        }
      };
      loadData();
    }
  }, [reloadData, storedUser, id]);

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
      } catch (err) {
        console.error(err);
      }
    };
    loadData();
  }, [reloadData, storedUser]);

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
    if (!newItem.name || !newItem.website || !newItem.url || !newItem.price) {
      error("Merci de remplir tous les champs obligatoires");
      return;
    }

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
    } catch (err) {
      console.error(err);
    } finally {
      setNewItem({
        name: "",
        website: "",
        url: "",
        image: "",
        price: "",
        user_id: storedUser.id,
        wishlist_id: id,
      });
      setModal(false);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setSelectedImage(URL.createObjectURL(e.target.files[0]));
      setNewItem({
        ...newItem,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setNewItem({
        ...newItem,
        [e.target.name]: e.target.value,
      });
    }
  };

  return (
    <div className="wrapper">
      {storedUser ? (
        <>
          <h1>{wishlists.name}</h1>
          <div className="list-container">
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
                  <img
                    src={storedUser.theme === 2 ? closeDark : close}
                    alt=""
                    width={25}
                  />
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
                  <div
                    className="img-sample"
                    style={{ display: "flex", gap: "10px" }}
                  >
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
                    {selectedImage && (
                      <img src={selectedImage} alt="" width={50} height={50} />
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      handleSubmitNewItem();
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
