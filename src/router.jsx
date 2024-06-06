import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Error404 from "./pages/error404/Error404";
import HomePage from "./pages/HomePage/HomePage";
import Seance from "./pages/seance/Seance";
import Alimentation from "./pages/alimentation/Alimentation";
import FormInscrip from "./pages/FormInscrip/FormInscrip";
import Connexion from "./pages/Connexion/Connexion";
import ExExos from "./pages/exExos/ExExos";
import ExRecette from "./pages/exRecette/ExRecette";
import Profile from "./pages/Profile/Profile";
import Logout from "./compenants/Logout";
import UserConnected from "./compenants/ProtectedRoutes/UserConnected";
import UserNotConnected from "./compenants/ProtectedRoutes/UserNotConnected";
import ForgetPassword from "./pages/Password/ForgetPassword";
import ResetPassword from "./pages/Password/ResetPassword";
import MentionLegal from "./pages/mentionLegal/MentionLegal";
import PolitiqueConfidentialite from "./pages/PolitiqueCofidentialité/PolitiqueConfidentialite";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error404 />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/séance",
        element: (
          <UserConnected>
            <Seance />
          </UserConnected>
        ),
      },
      {
        path: "/alimentation",
        element: (
          <UserConnected>
            <Alimentation />
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
        path: "/Exercices",
        element: <ExExos />,
      },
      {
        path: "/Recettes",
        element: <ExRecette />,
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
    ],
  },
]);
