import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

import { useStoredUser } from "../contexts/UserContext";
import AddWishList from "../components/AddWishList";
import SignIn from "../components/SignIn";

import defaut from "../assets/default.svg";
import bin from "../assets/bin.svg";
import { error } from "../services/toast";

import "../styles/wishlists.scss";
import ValidateWishlist from "../components/ValidateWishlist";

export default function Wishlists() {
  const { storedUser } = useStoredUser();
  const [wishlists, setWishlists] = useState([]);
  const [items, setItems] = useState([]);
  const [addNewWishlist, setAddNewWishlist] = useState(false);
  const [validate, setValidate] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupérer l'état du serveur lors du chargement de la page
        const wishlistsResponse = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/${
            storedUser.id
          }/wishlists`
        );
        setWishlists(wishlistsResponse.data);

        // Créer un tableau de promesses pour chaque requête d'items
        const itemPromises = wishlistsResponse.data.map(async (info) => {
          try {
            const itemsResponse = await axios.get(
              `${import.meta.env.VITE_BACKEND_URL}/api/users/${
                storedUser.id
              }/wishlists/${info.id}/items`
            );
            return itemsResponse.data;
          } catch (err) {
            console.error(err);
            return [];
          }
        });

        // Attendre la résolution de toutes les promesses
        const itemResults = await Promise.all(itemPromises);

        // Mettre à jour l'état items avec les résultats
        setItems(itemResults);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [storedUser.id]); // Assurez-vous que le useEffect est exécuté à chaque changement de storedUser.id

  /* Items */

  console.info({ items });

  /* NEW WISHLIST */

  const [list, setList] = useState({
    name: "",
    user_id: storedUser.id,
  });

  const handleChange = (e) => {
    setList({
      ...list,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (!list.name) {
      error("Merci de renseigner un nom");
      return;
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/wishlists`,
        list
      );

      setWishlists((prevWishlists) => [...prevWishlists, response.data]);
    } catch (err) {
      console.error("Error:", error);
    } finally {
      if (list.name) {
        setAddNewWishlist(false);
        setList({ name: "", user_id: storedUser.id });
      }
    }
  };

  const handleDelete = async (wishlistId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/wishlists/${wishlistId}`
      );
      setWishlists((prevWishlists) =>
        prevWishlists.filter((wishlist) => wishlist.id !== wishlistId)
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="wrapper">
      {storedUser ? (
        <>
          <div className="container">
            <button
              type="button"
              className="new-wish"
              onClick={() => setAddNewWishlist(true)}
            >
              Nouvelle Wishlist
            </button>

            <div className="wishlists">
              {wishlists.map((wishlist, index) => {
                return (
                  <>
                    <div className="list-row" key={wishlist.id}>
                      <Link
                        to={`/wishlists/${wishlist.id}`}
                        type="button"
                        className="wishlist"
                        key={wishlist.id}
                      >
                        <div className="images">
                          {items &&
                          Array.isArray(items) &&
                          items.length > 0 &&
                          Array.isArray(items[index])
                            ? items[index]
                                .slice(-4) // Prend les 4 derniers éléments
                                .map((item) => (
                                  <div key={item.id} className="img">
                                    {item.image &&
                                      wishlist &&
                                      wishlist.id === item.wishlist_id && (
                                        <img
                                          src={`${
                                            import.meta.env.VITE_BACKEND_URL
                                          }/${item.image}`}
                                          alt=""
                                          key={item.id}
                                        />
                                      )}
                                  </div>
                                ))
                            : null}
                        </div>

                        <h2 id="name">{wishlist.name}</h2>
                      </Link>
                      <button
                        type="button"
                        className="delete"
                        onClick={() =>
                          /* handleDelete(wishlist.id) */ setValidate(true)
                        }
                      >
                        <img src={bin} alt="" width={20} />
                        <p hidden>je suis un bouton</p>
                      </button>
                    </div>
                    {validate && (
                      <ValidateWishlist
                        handleDelete={handleDelete}
                        setValidate={setValidate}
                        wishlist={wishlist}
                        storedUser={storedUser}
                        key={`validate-${wishlist.id}`}
                      />
                    )}
                  </>
                );
              })}
            </div>
          </div>
          {addNewWishlist && (
            <AddWishList
              setAddNewWishlist={setAddNewWishlist}
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              storedUser={storedUser}
            />
          )}
        </>
      ) : (
        <SignIn />
      )}
    </div>
  );
}
