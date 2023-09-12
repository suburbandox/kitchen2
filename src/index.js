import React from "react";
import ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import "./index.css";
import App from "./routes/App";
import App2 from "./routes/App2";
import a from "./routes/a";

import Navbar from './Navbar'


const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,

    },
    {
        path: "/app2",
        element: <App2/>,
    },

]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
        <React.StrictMode>
        <Navbar />
        <a />
        <RouterProvider router={router} />
  </React.StrictMode>,
);
