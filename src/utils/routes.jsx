import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/Home";
import Login from "../pages/auth/login/Login";
import SignUp from "../pages/auth/signup/SignUp";
import Leaderboard from "../pages/Leaderboard/Leaderboard";
import Profile from "../pages/profile/Profile";
import Requests from "../pages/requests/Requests";
import Events from "../pages/events/Events";
import CreateEvent from "../pages/create event/CreateEvent";
import ViewProfile from "../pages/profile/ViewProfile";
import EditEvent from "../pages/editEvent/EditEvent";
import CompleteEvent from "../pages/completeEvent/CompleteEvent";

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
    path: "/profile/:id",
    element: <ViewProfile />,
  },
  {
    path: "/requests",
    element: <Requests />,
  },
  {
    path: "/events",
    element: <Events />,
  },
  {
    path: "/events/create",
    element: <CreateEvent />,
  },
  {
    path: "/event/edit/:id",
    element: <EditEvent />,
  },
  {
    path: "/event/complete/:id",
    element: <CompleteEvent />,
  },
]);
