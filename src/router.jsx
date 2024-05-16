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

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error404 />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/séance",
        element: <Seance />,
      },
      {
        path: "/alimentation",
        element: <Alimentation />,
      },
      {
        path: "/connexion",
        element: <Connexion />,
      },
      {
        path: "/inscription",
        element: <FormInscrip />,
      },
      {
        path: "/Exercices",
        element: <ExExos />,
      },
      {
        path: "/Recettes",
        element: <ExRecette />,
      },
    ],
  },
]);
