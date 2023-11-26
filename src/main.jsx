import React from 'react'
import App from './app.jsx'
import './index.css'
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import LoginForm from './components/LoginForm.jsx'; 
import RegisterForm from './components/RegisterForm.jsx';
import Navbar from './components/navbar';
import Products from './components/products';
import Sales from './components/sales';
import ProductsCreation from './components/productsCreation.jsx';
import SaleCreation from './components/saleCreation.jsx';
import SalesView from './components/salesView.jsx';
import SalesEdit from './components/salesEdit.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/login",
    element: <LoginForm/>,
  },
  {
    path: "/register",
    element: <RegisterForm/>,
  },
  {
    path: "/products",
    element: <Products/>,
  },
  {
    path: "/sales",
    element: <Sales/>,
  },
  {
    path: "/navbar",
    element: <Navbar/>,
  },
  {
    path: "/productsCreation",
    element: <ProductsCreation/>,
  },
  {
    path: "/editProduct/:id",
    element: <ProductsCreation/>,
  },
  {
    path: "/sales/:id",
    element: <SaleCreation/>,
  },
  {
    path: "/salesView",
    element: <SalesView/>,
  },
  {
    path: "/editSale/:id",
    element: <SalesEdit/>,
  },
]);



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
