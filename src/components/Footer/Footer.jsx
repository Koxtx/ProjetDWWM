import { NavLink } from "react-router-dom";
import styles from "./Footer.module.scss";
import logo from "../../image/logo.png";

export default function Footer() {
  return (
    <footer>
      <NavLink className={`mr-15`} to="/">
        <img src={logo} className={`${styles.logo} `} alt="GoIt" />
      </NavLink>
      <div className="d-flex flex-column center m-20">
        <ul className="d-flex flex-column center">
          <l1>
            <NavLink className={`mr-15`} to="//mentionlegal">
              Mentions légales
            </NavLink>
          </l1>
          <l1>
            <NavLink className={`mr-15`} to="/politiquedeconfidentialité">
              Politique de confidentialité
            </NavLink>
          </l1>
          <l1>Email : corentin.lavarde@gmail.com</l1>
          <l1>Numéro de téléphone : 0659296782</l1>
          <l1>Adresse : 74 rue Harry,auchel , France</l1>
        </ul>
      </div>
      <div>
        <p>© 2024 GoIt. Tous droits réservés.</p>
      </div>
    </footer>
  );
}
