import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

import "./styles/root.scss";

function App() {
  /*  const handleChange = (e) => {
    if (e.target.name === "image") {
      //BIEN APPELER L'INPUT FILE "IMAGE"
      setUser({
        ...user,
        [e.target.name]: e.target.files[0],
      });
    } else
      setUser({
        ...user,
        [e.target.name]: e.target.value,
      });
  }; */

  return (
    <>
      <Navbar />
      <Outlet />;
    </>
  );
}

export default App;
