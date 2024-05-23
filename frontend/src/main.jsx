import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./contexts/UserContext";

import App from "./App";
import Home from "./pages/Home";
import AuthSignUp from "./pages/AuthSignUp";
import AuthSignIn from "./pages/AuthSignIn";
import Wishlists from "./pages/Wishlists";
import Wishlist from "./pages/Wishlist";
import Account from "./pages/Account";
import Error from "./pages/Error";

import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signup",
        element: <AuthSignUp />,
      },
      {
        path: "/signin",
        element: <AuthSignIn />,
      },
      {
        path: "/my-wishlists",
        element: <Wishlists />,
      },
      {
        path: "/wishlists/:id",
        element: <Wishlist />,
      },
      {
        path: "/account",
        element: <Account />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <UserProvider>
    <RouterProvider router={router} />
    <ToastContainer />
  </UserProvider>
);
