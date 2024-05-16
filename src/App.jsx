import Header from "./compenants/Header/Header";
import Footer from "./compenants/Footer/Footer";
import styles from "./App.module.scss";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { useState, useEffect } from "react";

function App() {
  const [exercices, setExercices] = useState([]);
  const [recettes, setRecettes] = useState([]);

  // récupération BDD avec useEffect
  useEffect(() => {
    async function getAllExercices() {
      try {
        const response = await fetch("http://localhost:5000/api/exercices");
        if (response.ok) {
          const allExercices = await response.json();
          setExercices(allExercices);
        }
      } catch (error) {
        console.error(error);
      }
    }
    getAllExercices();
    async function getAllRecettes() {
      try {
        const response = await fetch("http://localhost:5000/api/recettes");
        if (response.ok) {
          const allRecettes = await response.json();
          setRecettes(allRecettes);
        }
      } catch (error) {
        console.error(error);
      }
    }
    getAllExercices();
    getAllRecettes();
  }, []);

  function toggleLiked(i) {
    console.log(i);
    setExercices(
      exercices.map((e) => (e._id === i ? { ...e, liked: !e.liked } : e))
    );
  }

  return (
    <div
      className={`mhFull
     ${styles.main}`}
    >
      <Header />
      <Outlet context={{ exercices, toggleLiked, recettes }} />
      <Footer />
      <ScrollRestoration />
    </div>
  );
}

export default App;
