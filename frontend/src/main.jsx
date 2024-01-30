import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";

import App from "./App";
import Home from "./pages/Home";
import Auth from "./pages/Auth";

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
        element: <Auth />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <UserProvider>
    <RouterProvider router={router} />
  </UserProvider>
);
