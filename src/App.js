import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root, { loader as authLoader } from "./pages/Root";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Product from "./pages/Product";
import Error from "./pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    element: <Root />,
    loader: authLoader,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "product", element: <Product /> },
    ],
  },
  { path: "/login", element: <Login /> },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
