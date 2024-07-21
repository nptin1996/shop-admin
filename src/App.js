import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root, { loader as authLoader } from "./pages/Root";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Dashboard, { loader as dashboardLoader } from "./pages/Dashboard";
import Product, { loader as productsLoader } from "./pages/Product";
import Error from "./pages/Error";
import AddProduct from "./pages/AddProduct";
import EditProduct, { loader as productLoader } from "./pages/EditProduct";
import ChatPage, { loader as chatsLoader } from "./pages/Chat";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    element: <Root />,
    loader: authLoader,
    children: [
      {
        index: true,
        element: <Dashboard />,
        loader: dashboardLoader,
      },
      { path: "chat", element: <ChatPage />, loader: chatsLoader },
      { path: "product", element: <Product />, loader: productsLoader },
      { path: "product/add", element: <AddProduct /> },
      {
        path: "product/edit/:productId",
        element: <EditProduct />,
        loader: productLoader,
      },
    ],
  },
  { path: "/logout", element: <Logout /> },
  { path: "/login", element: <Login /> },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
