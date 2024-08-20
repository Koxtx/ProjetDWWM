import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Error404 from "./pages/error404/Error404";
import HomePage from "./pages/HomePage/HomePage";
import FormInscrip from "./pages/FormInscrip/FormInscrip";
import Connexion from "./pages/Connexion/Connexion";
import Profile from "./pages/Profile/Profile";
import Logout from "./components/Logout";
import UserConnected from "./components/ProtectedRoutes/UserConnected";
import UserNotConnected from "./components/ProtectedRoutes/UserNotConnected";
import ForgetPassword from "./pages/Password/ForgetPassword";
import ResetPassword from "./pages/Password/ResetPassword";
import MentionLegal from "./pages/mentionLegal/MentionLegal";
import PolitiqueConfidentialite from "./pages/PolitiqueCofidentialité/PolitiqueConfidentialite";
import WorkoutList from "./pages/Workouts/WorkoutList";
import NutritionList from "./pages/Nutrition/NutritionList";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error404 />,
    children: [
      {
        index: true,
        element: (
          <UserConnected>
            <HomePage />
          </UserConnected>
        ),
      },

      {
        path: "/connexion",
        element: (
          <UserNotConnected>
            <Connexion />
          </UserNotConnected>
        ),
      },
      {
        path: "/inscription",
        element: (
          <UserNotConnected>
            <FormInscrip />
          </UserNotConnected>
        ),
      },

      {
        path: "/forgetpassword",
        element: (
          <UserNotConnected>
            <ForgetPassword />
          </UserNotConnected>
        ),
      },
      {
        path: "/resetpassword/:token",
        element: (
          <UserNotConnected>
            <ResetPassword />
          </UserNotConnected>
        ),
      },
      {
        path: "/profile",
        element: (
          <UserConnected>
            <Profile />
          </UserConnected>
        ),
      },
      {
        path: "/logout",
        element: (
          <UserConnected>
            <Logout />
          </UserConnected>
        ),
      },
      {
        path: "/mentionlegal",
        element: <MentionLegal />,
      },
      {
        path: "/politiquedeconfidentialité",
        element: <PolitiqueConfidentialite />,
      },
      { path: "/workout", element: <WorkoutList /> },
      { path: "/nutrition", element: <NutritionList /> },
    ],
  },
]);
