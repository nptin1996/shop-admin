import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root, { loader as authLoader } from "./pages/Root";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: authLoader,
    children: [{ index: true, element: <Dashboard /> }],
  },
  { path: "/login", element: <Login /> },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
