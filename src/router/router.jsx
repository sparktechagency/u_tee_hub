
import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../layout/Main";
import DashboardPage from "../pages/DashboardPage/DashboardPage";
import Signin from "../pages/Signin/Signin";
import Verify from "../pages/Verify/Verify";
import ForgotPass from "../pages/ForgotPass/ForgotPass";
import SetPass from "../pages/SetPass/SetPass";
import Vendor from "../pages/Vendor/Vendor";
import OwnerDetails from "../pages/OwnerDetails/OwnerDetails";
import Accept from "../components/Vendor/Accept";
import Reject from "../components/Vendor/Reject";
import Client from "../pages/Client/Client";
import ClientDetails from "../components/Client/ClientDetails";
import OrderPage from "../pages/OrderPage/OrderPage";
import OrderDetails from "../components/Order/OrderDetails";
import AboutUs from "../pages/SettingPage/AboutUs";

  
  const router = createBrowserRouter([
    {
      path: "/sign-in",
      element: <Signin />,
    },
    {
      path: "/validation",
      element: <Verify />,
    },
    {
      path: "/forget-password",
      element: <ForgotPass/>,
    },
    {
      path: "/setPass",
      element: <SetPass/>,
    },
    {
        path: "/",
        element: <Main></Main>,
        // errorElement: <ErrorPage></ErrorPage>,
        children: [
          {
            path: "/",
            element: <DashboardPage/>,
          },
          {
            path: "/vendor",
            element: <Vendor/>,
          },
          {
            path: "/ownerDetails",
            element: <OwnerDetails/>,
          },
          {
            path: "/accept",
            element: <Accept/>,
          },
          {
            path: "/rejected",
            element: <Reject/>,
          },
          {
            path: "/order",
            element: <OrderPage/>,
          },
          {
            path: "/setting/aboutUs",
            element: <AboutUs/>,
          },
          {
            path: "/client",
            element: <Client/>,
          },
          {
            // Dynamic route for client details
            path: "/client/:id",
            element: <ClientDetails />, 
          },
          {
            // Dynamic route for client details
            path: "/order/:id",
            element: <OrderDetails />, 
          },
        ]
    },

  ]);
  export default router;