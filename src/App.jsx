import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import styles from "./App.module.scss";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { useState, useEffect } from "react";
import UserProvider from "./components/Providers/UserProvider";
import SeanceProvider from "./components/Providers/SeanceProvider";
import PrProvider from "./components/Providers/PrProvider";
import MealProvider from "./components/Providers/MealProvider";

import RecettesPrivider from "./components/Providers/RecettesPrivider";

function App() {
  return (
    <div
      className={`mhFull
     ${styles.main}`}
    >
      <UserProvider>
        <Header />
        <Outlet />
        <Footer />
        <ScrollRestoration />
      </UserProvider>
    </div>
  );
}

export default App;
