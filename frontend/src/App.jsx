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
        setStoredUser(res.data);
        window.localStorage.setItem("player", JSON.stringify(res.data));
      })
      .catch((err) => {
        setStoredUser(false);
        window.localStorage.removeItem("player");
        console.error(err);
      });
  }, []);

  return (
    <>
      <Navbar />
      <Outlet />;
    </>
  );
}

export default App;
