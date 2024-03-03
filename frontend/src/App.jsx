import Cookies from "js-cookie";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

import { useStoredUser } from "./contexts/UserContext";
import Navbar from "./components/Navbar";

import "./styles/root.scss";

function App() {
  const { setStoredUser } = useStoredUser();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/protected`, {
        withCredentials: true,
      })
      .then((res) => {
        const { id, pseudo, theme, email } = res.data;
        const userData = { id, pseudo, theme, email };

        setStoredUser(userData);
        Cookies.set("user", JSON.stringify(userData), { expires: 7 });
      })
      .catch((err) => {
        setStoredUser(false);
        Cookies.remove("user");
        console.error(err);
      });
  }, []);

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
