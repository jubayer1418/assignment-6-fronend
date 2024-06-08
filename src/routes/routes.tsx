import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../page/Login";
import Product from "../page/Product";
import Register from "../page/Register";
import SalesHistory from "../page/SalesHistory";
import AddProductModal from "../page/AddProductModal";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "all-products",
        element: <Product></Product>,
      },
      {
        path: "sales-history",
        element: <SalesHistory></SalesHistory>,
      },
      {
        path: "add-product",
        element: <AddProductModal></AddProductModal>,
      },
    
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
]);
