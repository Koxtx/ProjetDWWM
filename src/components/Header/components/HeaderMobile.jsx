import React, { useContext } from "react";
import styles from "./HeaderMobile.module.scss";
import { UserContext } from "../../../context/UserContext";
import { NavLink } from "react-router-dom";

export default function HeaderMobile({ setShowMenu }) {
  const { user } = useContext(UserContext);
  return (
    <div>
      {user ? (
        <>
          <ul className={`p-20 d-flex flex-column ${styles.container}`}>
          <NavLink  onClick={() => {
                setShowMenu(false);
              }} className=" btn mr-60" to="/workout">
                Séance
              </NavLink>
              <NavLink  onClick={() => {
                setShowMenu(false);
              }} className=" btn mr-60" to="/nutrition">
                Nutrition
              </NavLink>
              <NavLink   onClick={() => {
                setShowMenu(false);
              }}className="mr-60" to="/profile">
                <span>Profile</span>
              </NavLink>
              <NavLink  onClick={() => {
                setShowMenu(false);
              }}className="mr-60" to="/logout">
                <span>Logout</span>
              </NavLink>
          </ul>
        </>
      ) : (
        <>
          <ul className={`p-20 d-flex flex-column ${styles.container}`}>
            <NavLink
              onClick={() => {
                setShowMenu(false);
              }}
              to="/connexion"
              className="mr-15"
            >
              Register
            </NavLink>
            <NavLink
              onClick={() => {
                setShowMenu(false);
              }}
              to="/login"
            >
              Login
            </NavLink>
          </ul>
        </>
      )}
    </div>
  );
}
