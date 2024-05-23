/* eslint-disable no-unused-expressions */
import Cookies from "js-cookie";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

import { useStoredUser } from "./contexts/UserContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import "./styles/root.scss";

function App() {
  const { storedUser, setStoredUser } = useStoredUser();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/protected`, {
        withCredentials: true,
      })
      .then((res) => {
        const { id, pseudo, theme, email } = res.data;
        const userData = { id, pseudo, theme, email };

        setStoredUser(userData);
      })
      .catch((err) => {
        setStoredUser(false);

        console.error(err);
      });
  }, []);

  useEffect(() => {
    storedUser.theme === 2
      ? document.body.classList.add("dark")
      : document.body.classList.remove("dark");
  }, [storedUser.theme]);

  return (
    <>
      <Navbar key={storedUser.theme} />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
