import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";

import App from "./App";
import Home from "./pages/Home";
import AuthSignUp from "./pages/AuthSignUp";
import AuthSignIn from "./pages/AuthSignIn";
import Wishlists from "./pages/Wishlists";
import Wishlist from "./pages/Wishlist";
import Account from "./pages/Account";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    element: <App />,
    /*     errorElement:  */
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
        element: <ProtectedRoute />,
        children: [
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
