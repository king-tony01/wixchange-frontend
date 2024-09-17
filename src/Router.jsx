import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Home from "./app/Home";
import HomeTab from "./app/HomeTab";
import WalletTab from "./app/WalletTab";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
        children: [
          {
            index: true,
            element: <HomeTab />,
          },
          {
            path: "/wallet",
            element: <WalletTab />,
          },
          {
            path: "/services",
            element: <div>Services</div>,
          },
          {
            path: "/menu",
            element: <div>Menu</div>,
          },
        ],
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
]);
export default router;
