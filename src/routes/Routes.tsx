import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Dashboard from "../app/Dashboard";
import Layout from "../app/Layout";
import Login from "../app/Login";
import NotFound from "../components/NotFound";
import { checkAuthLoader, checkLoggedIn, userLogout } from "../utils/authUtils";

const Routes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/login",
          element: <Login />,
          loader: checkLoggedIn,
        },
        {
          path: "",
          element: <Dashboard />,
          loader: checkAuthLoader,
        },
        {
          path: "*", // Catch-all for undefined routes
          element: <NotFound />,
        },
      ],
    },
    {
      path: "/logout",
      loader: userLogout,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Routes;
