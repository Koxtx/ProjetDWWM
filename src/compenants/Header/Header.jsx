import { NavLink } from "react-router-dom";
import styles from "./Header.module.scss";
import logo from "../../image/logo.png";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

export default function Header() {
  const { user } = useContext(UserContext);
  console.log(user);
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
          {user ? (
            <>
              <NavLink className=" btn mr-60" to="/Séance">
                Séance
              </NavLink>
              <NavLink className="btn mr-60 " to="/Alimentation">
                Alimentation
              </NavLink>
            </>
          ) : null}

          <NavLink className="btn mr-60 " to="/Exercices">
            Exercices
          </NavLink>
          <NavLink className="btn " to="/Recettes">
            Recettes
          </NavLink>
        </nav>
      </div>
      <div
        className={`d-flex flex-fill flex-row justify-content-end align-items-center  p-10 ${styles.nav2}`}
      >
        <nav className={` p-10 `}>
          {user ? (
            <>
              <NavLink className="mr-15" to="/profile">
                <span>Profile</span>
              </NavLink>
              <NavLink className="mr-15" to="/logout">
                <span>Logout</span>
              </NavLink>
            </>
          ) : (
            <>
              <NavLink className="mr-15" to="/inscription">
                <span>Register</span>
              </NavLink>
              <NavLink className="mr-15" to="/connexion">
                <span>Login</span>
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
