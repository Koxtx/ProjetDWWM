import React, { useContext } from "react";
import styles from "./HomePage.module.scss";
import WomanHaltero from "../../image/woman-haltero.jpg";

import { UserContext } from "../../context/UserContext";
import AddWorkout from "../Workouts/AddWorkout";

export default function HomePage() {
  const { user } = useContext(UserContext);

  return (
    <main>
      <section>
        <img
          src={WomanHaltero}
          className={`${styles.image}`}
          alt="Woman haltero"
        />
      </section>
      <AddWorkout />
    </main>
  );
}
