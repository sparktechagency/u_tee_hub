
import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../layout/Main";
import DashboardPage from "../pages/DashboardPage/DashboardPage";
import Signin from "../pages/Signin/Signin";
import Verify from "../pages/Verify/Verify";
import ForgotPass from "../pages/ForgotPass/ForgotPass";

  
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
        path: "/",
        element: <Main></Main>,
        // errorElement: <ErrorPage></ErrorPage>,
        children: [
          {
            path: "/",
            element: <DashboardPage/>,
          },
        ]
    },

  ]);
  export default router;