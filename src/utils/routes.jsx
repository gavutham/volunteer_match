import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/Home";
import Login from "../pages/auth/login/Login";
import SignUp from "../pages/auth/signup/SignUp";
import Leaderboard from "../pages/Leaderboard/Leaderboard";
import Profile from "../pages/profile/Profile";
import Requests from "../pages/requests/Requests";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/leaderboard",
    element: <Leaderboard />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/requests",
    element: <Requests />,
  },
]);
