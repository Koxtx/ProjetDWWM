import { NavLink } from "react-router-dom";
import styles from "./Header.module.scss";
import logo from "../../image/logo.png";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import HeaderMobile from "./components/HeaderMobile";

export default function Header() {
  const { user } = useContext(UserContext);
  const [showMenu, setShowMenu] = useState(false);
  // console.log(user);
  return (
    <header className={`${styles.header}`} >
      <div
        className={`d-flex flex-fill flex-row justify-content-center align-items-center  p-10 `}
      >
        <NavLink className={`mr-15`} to="/">
          <img src={logo} className={`${styles.logo} `} alt="GoIt" />
        </NavLink>

        <nav className={`d-flex flex-row  align-items-center ${styles.nav}`}>
         
          {user ? (
            <>
             <div className={`${styles.burgerMenu}`}>
              <NavLink className={`  mr-60  `} to="/workout">
                Séance
              </NavLink>
              <NavLink className="  mr-60" to="/nutrition">
                Nutrition
              </NavLink>
              <NavLink className="mr-60" to="/profile">
                <span>Profile</span>
              </NavLink>
              <NavLink className="mr-60" to="/logout">
                <span>Logout</span>
              </NavLink></div>
              <i
                onClick={() => setShowMenu(true)}
                className={`fas fa-bars mr-10 ${styles.mobileHeader}`}
              ></i>
            </>
          ) : (
            <>
             <div className={`${styles.burgerMenu}`}>
              <NavLink className="mr-15" to="/inscription">
                <span>Register</span>
              </NavLink>
              <NavLink className="mr-15" to="/connexion">
                <span>Login</span>
              </NavLink>
              </div>
              <i
                onClick={() => setShowMenu(true)}
                className={`fas fa-bars mr-10 ${styles.mobileHeader}`}
              ></i>
            </>
          )}
           {showMenu && (
            <>
              <div onClick={() => setShowMenu(false)} className="calc"></div>
              <HeaderMobile setShowMenu={setShowMenu} />
            </>
          )}
           
        </nav>
       
      </div>
    </header>
  );
}
