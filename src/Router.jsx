import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Home from "./app/Home";
import HomeTab from "./app/HomeTab";
import WalletTab from "./app/WalletTab";
import Services from "./app/Services";
import VTUServices from "./app/VTUServices";
import GiftCardsHome from "./app/GiftCardsHome";
import GiftCardMarket from "./app/GiftCardMarket";
import CardDetails from "./app/CardDetails";
import Checkout from "./app/Checkout";
import NotFound from "./NotFound";
import ListNewCard from "./app/ListNewCard";
import Menu from "./app/Menu";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
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
            element: <Services />,
          },
          {
            path: "/menu",
            element: <Menu />,
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
      {
        path: "/services/vtu",
        element: <VTUServices />,
      },
      {
        path: "/services/gift-card",
        element: <GiftCardsHome />,
      },
      {
        path: "/services/gift-card/marketplace",
        element: <GiftCardMarket />,
      },
      {
        path: "/services/gift-card/marketplace/list-new",
        element: <ListNewCard />,
      },
      {
        path: "/services/gift-card/details",
        element: <CardDetails />,
      },
      {
        path: "/services/gift-card/checkout",
        element: <Checkout />,
      },
    ],
  },
]);
export default router;
