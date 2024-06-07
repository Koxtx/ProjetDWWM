import React, { useState } from "react";
import OneExercices from "./OneExercices";
import { NavLink, useOutletContext, useParams } from "react-router-dom";

export default function ExExos() {
  const [filterExo, setFilterExo] = useState("");
  const { bodyPart } = useParams();
  // console.log(bodyPart);

  const { exercices } = useOutletContext();
  return (
    <main className="mhFull">
      <h2 className="ml-10">Exercices :</h2>
      <div>
        <ul>
          <NavLink end to="/Exercices">
            tous
          </NavLink>
          <NavLink to="/Exercices/Dos">Dos</NavLink>
          <NavLink to="/Exercices/Pectoraux">Pectauraux</NavLink>
          <NavLink to="/Exercices/Épaules">Épaules</NavLink>
          <NavLink to="/Exercices/Bras">Bras</NavLink>
          <NavLink to="/Exercices/Jambes">Jambes</NavLink>
          <NavLink to="/Exercices/Abdos">Abdos</NavLink>
        </ul>
      </div>

      <div className="d-flex flex-wrap justify-content-center">
        {bodyPart
          ? exercices
              .filter((e) => e.bodyPart === bodyPart)
              .filter((e) => e.name.toLowerCase().startsWith(filterExo))
              .map((e) => <OneExercices key={e._id} e={e} />)
          : exercices
              .filter((e) => e.name.toLowerCase().startsWith(filterExo))
              .map((e) => <OneExercices key={e._id} e={e} />)}
      </div>
    </main>
  );
}
