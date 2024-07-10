import React from "react";
import oeufs from "../../image/oeufs.jpg";
import styles from "./Alimentation.module.scss";
import { NavLink } from "react-router-dom";
import NutrientSearch from "../../components/Meal/NutrientSearch";
import FoodInfo from "../../components/Meal/FoodInfo";
import UnitConversion from "../../components/Meal/UnitConversion";
import MealPlanner from "../../components/Meal/MealPlanner";
import GoalForm from "../../components/Meal/GoalForm";
import Progress from "../../components/Meal/Progress";

export default function Alimentation() {
  return (
    <main className="mhFull">
      <section>
        <img src={oeufs} className={`${styles.image}`} alt="oeufs" />
      </section>
      <section>
        <h2 className="mt-30 ml-10"> Alimentation :</h2>
        <NutrientSearch />
        <FoodInfo />
        <UnitConversion />
        <MealPlanner />
        <GoalForm />
        <Progress />
      </section>
      <section>
        <div>
          <ul>
            <NavLink end to="/Recettes">
              Tous
            </NavLink>
            <NavLink to="/Recettes/Petit-déjeuner">Petit-déjeuner</NavLink>
            <NavLink to="/Recettes/Déjeuner">Déjeuner</NavLink>
            <NavLink to="/Recettes/Collation">Collation</NavLink>
            <NavLink to="/Recettes/Dîner">Dîner</NavLink>
            <NavLink to="/Recettes/Dessert">Dessert</NavLink>
          </ul>
        </div>
      </section>
    </main>
  );
}
