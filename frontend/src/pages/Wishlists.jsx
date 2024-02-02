import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

import { useStoredUser } from "../contexts/UserContext";
import AddWishList from "../components/AddWishList";
import SignIn from "../components/SignIn";

import defaut from "../assets/default.svg";
import bin from "../assets/bin.svg";

import "../styles/wishlists.scss";
import ValidateWishlist from "../components/ValidateWishlist";

export default function Wishlists() {
  const { storedUser } = useStoredUser();
  const [wishlists, setWishlists] = useState([{}]);
  const [items, setItems] = useState([]);
  const [addNewWishlist, setAddNewWishlist] = useState(false);
  const [validate, setValidate] = useState(false);
  const { id } = useParams();

  function getImages(infos) {
    infos.forEach((info) => {
      axios
        .get(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/${
            storedUser.id
          }/wishlists/${info.id}/items`
        )
        .then((res) => {
          setItems((prevItems) => [...prevItems, res.data]);
        })
        .catch((err) => console.error(err));
    });
  }

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${
          storedUser.id
        }/wishlists`
      )
      .then((res) => {
        setWishlists(res.data);
        getImages(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

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
    if (list.name.trim() === "") {
      alert("Merci de renseigner un nom");
      return;
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/wishlists`,
        list
      );

      setWishlists((prevWishlists) => [...prevWishlists, response.data]);
    } catch (error) {
      console.error(error);
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
    } catch (error) {
      console.error(error);
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
              {wishlists.map((wishlist) => {
                return (
                  <>
                    <div className="list-row">
                      <Link
                        to={`/wishlists/${wishlist.id}`}
                        type="button"
                        className="wishlist"
                        key={wishlist.id}
                      >
                        <div className="images">
                          {items.slice(0, 3).map((item) => {
                            return (
                              <div key={item.id} className="img">
                                {item.map((img, index) => {
                                  if (index < 4) {
                                    return wishlist.id === img.wishlist_id ? (
                                      <img
                                        src={
                                          img.image
                                            ? `${
                                                import.meta.env.VITE_BACKEND_URL
                                              }/${img.image}`
                                            : defaut
                                        }
                                        alt=""
                                        key={img.id}
                                      />
                                    ) : (
                                      ""
                                    );
                                  }
                                  return null;
                                })}
                              </div>
                            );
                          })}
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
            />
          )}
        </>
      ) : (
        <SignIn />
      )}
    </div>
  );
}
