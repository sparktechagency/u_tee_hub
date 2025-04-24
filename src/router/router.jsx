
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
        ]
    },

  ]);
  export default router;