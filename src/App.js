import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root, { loader as authLoader } from "./pages/Root";
import Login from "./pages/Login";
import Dashboard, { loader as dashboardLoader } from "./pages/Dashboard";
import Product, { loader as productsLoader } from "./pages/Product";
import Error from "./pages/Error";
import AddProduct from "./pages/AddProduct";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    element: <Root />,
    loader: authLoader,
    children: [
      { index: true, element: <Dashboard />, loader: dashboardLoader },
      { path: "product", element: <Product />, loader: productsLoader },
      { path: "product/add", element: <AddProduct /> },
    ],
  },
  { path: "/login", element: <Login /> },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
