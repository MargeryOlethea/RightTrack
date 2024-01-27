import { createBrowserRouter, redirect } from "react-router-dom";
import BaseLayout from "../layouts/BaseLayout";
import HomePage from "../views/HomePage";
import RegisterPage from "../views/RegisterPage";
import LoginPage from "../views/LoginPage";
import UserPage from "../views/UserPage";

const url = import.meta.env.VITE_API_URL;
export const router = createBrowserRouter([
  {
    path: "/register",
    loader: () => {
      const access_token = localStorage.getItem("access_token");

      if (access_token) {
        return redirect("/");
      }

      return null;
    },
    element: <RegisterPage url={url} />,
  },
  {
    path: "/login",
    loader: () => {
      const access_token = localStorage.getItem("access_token");

      if (access_token) {
        return redirect("/");
      }

      return null;
    },
    element: <LoginPage url={url} />,
  },
  {
    element: <BaseLayout />,
    loader: () => {
      const access_token = localStorage.getItem("access_token");

      if (!access_token) {
        return redirect("/login");
      }

      return null;
    },
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/my-spending",
        element: <UserPage url={url} />,
      },
    ],
  },
]);
