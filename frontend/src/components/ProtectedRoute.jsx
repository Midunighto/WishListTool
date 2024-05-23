import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { error } from "../services/toast";

function ProtectedRoute() {
  const navigate = useNavigate();
  const [allowed, setAllowed] = useState(false);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/protected`, {
        withCredentials: true,
      })
      .then(() => setAllowed(true))
      .catch((err) => {
        navigate("/signin", { replace: true });
        error("Une erreur est survenue, merci de vous reconnecter");
        console.error(err);
      });
  }, []);
  if (!allowed) return null;
  return <Outlet />;
}

export default ProtectedRoute;
