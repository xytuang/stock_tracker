import React from "react";
import * as ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Root from "./Root";
import Login from "./components/Login";
import Register from "./components/Register";
import Landing from "./components/Landing";
import { AuthProvider } from "./AuthContext";


  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/register",
      element: <Register />
    },
    {
      path: "/landing",
      element: <Landing/>
    }
  ]);
  
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </React.StrictMode>
  );
