import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

import { useStoredUser } from "../contexts/UserContext";
import AddWishList from "../components/AddWishList";

import "../styles/wishlists.scss";

export default function Wishlists() {
  const { storedUser } = useStoredUser();
  const [wishlists, setWishlists] = useState([{}]);
  const [items, setItems] = useState([{}]);
  const [addNewWishlist, setAddNewWishlist] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${
          storedUser.id
        }/wishlists`
      )
      .then((res) => {
        setWishlists(res.data);
      })
      .catch((err) => console.error(err));
  }, [wishlists]);

  /* CALL ITEMS TO GET IMAGES */
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
  }, []);

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

      // Ajoutez la nouvelle wishlist à l'état de wishlists
      setWishlists((prevWishlists) => [...prevWishlists, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="wrapper">
      <div className="container">
        <button
          type="button"
          className="new-wish"
          onClick={() => setAddNewWishlist(true)}
        >
          Nouvelle Wishlist
        </button>

        <div className="wishlists">
          {wishlists.map((wishlist) => (
            <Link
              to={`/wishlists/${wishlist.id}`}
              type="button"
              className="wishlist"
              key={wishlist.id}
            >
              <div className="images">
                {items.map((item) => (
                  <>
                    <img src={item.image} alt="" width={30} key={item.image} />
                    <img src={item.image} alt="" width={30} key={item.image} />
                    <img src={item.image} alt="" width={30} key={item.image} />
                    <img src={item.image} alt="" width={30} key={item.image} />
                  </>
                ))}
              </div>
              <h2>{wishlist.name}</h2>
            </Link>
          ))}
        </div>
      </div>
      {addNewWishlist && (
        <AddWishList
          setAddNewWishlist={setAddNewWishlist}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
        />
      )}
    </div>
  );
}
