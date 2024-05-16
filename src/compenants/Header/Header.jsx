import { NavLink } from "react-router-dom";
import styles from "./Header.module.scss";
import logo from "../../image/logo.png";

export default function Header() {
  return (
    <header className="d-flex flex-row justify-content-center align-items-center  ">
      <div
        className={`d-flex flex-fill flex-row justify-content-center align-items-center  p-10 ${styles.nav1}`}
      >
        <NavLink className={`mr-15`} to="/">
          <img src={logo} className={`${styles.logo} `} alt="GoIt" />
        </NavLink>

        <nav className="d-flex flex-row  align-items-center  ">
          <NavLink className=" btn mr-60" to="/">
            Acceuil
          </NavLink>
          <NavLink className=" btn mr-60" to="/Séance">
            Séance
          </NavLink>
          <NavLink className="btn mr-60 " to="/Alimentation">
            Alimentation
          </NavLink>
          <NavLink className="btn mr-60 " to="/Exercices">
            Exercices
          </NavLink>
          <NavLink className="btn " to="/Recettes">
            Recettes
          </NavLink>
        </nav>
      </div>
      <nav
        className={`d-flex flex-row justify-content-center align-items-center  p-10 ${styles.nav2}`}
      >
        <NavLink className="btn mr-15" to="/connexion">
          Login
        </NavLink>
        <p className="mr-15">/</p>
        <NavLink className={`btn mr-15 reverse`} to="/inscription">
          SignUp
        </NavLink>
      </nav>
    </header>
  );
}
