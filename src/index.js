import React from "react";
import ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import "./index.css";
import App from "./App";
import App2 from "./App2";
import Navbar from './Navbar'
import Root from "./routes/root";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
    },
    {
        path: "/app",
        element: <App/>,
    },
    {
        path: "/app2",
        element: <App2/>,
    },
    {
        path: "/app/:number",
        element: <App/>,
    },
    {
        path: "/html/:page",
        element: <Recipe/>,
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
        <React.StrictMode>
        <Navbar />
        <RouterProvider router={router} />
  </React.StrictMode>,
);
