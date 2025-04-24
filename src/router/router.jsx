
import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../layout/Main";
import DashboardPage from "../pages/DashboardPage/DashboardPage";
import Signin from "../pages/Signin/Signin";

  
  const router = createBrowserRouter([
    {
      path: "/sign-in",
      element: <Signin />,
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