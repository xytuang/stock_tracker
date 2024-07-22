import React from "react";
import * as ReactDOM from 'react-dom';

import Root from "./Root";
import Login from "./components/Login";
import Register from "./components/Register";

import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
  } from "react-router-dom";
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route path="login" element={<Login/>}/>
        <Route path="register" element={<Register/>}/>
      </Route>
    )
  );
  
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );