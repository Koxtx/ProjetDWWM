import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import styles from "./App.module.scss";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { useState, useEffect } from "react";
import UserProvider from "./components/Providers/UserProvider";
import WorkoutProvider from "./components/Providers/WorkoutProvider";

function App() {
  return (
    <div
      className={`mhFull
     ${styles.main}`}
    >
      <UserProvider>
        <WorkoutProvider>
          <Header />
          <Outlet />
          <Footer />
          <ScrollRestoration />
        </WorkoutProvider>
      </UserProvider>
    </div>
  );
}

export default App;
