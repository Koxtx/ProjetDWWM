import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import styles from "./App.module.scss";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { useState, useEffect } from "react";
import UserProvider from "./components/Providers/UserProvider";
import WorkoutProvider from "./components/Providers/WorkoutProvider";
import NutritionProvider from "./components/Providers/NutritionProvider";
import PublicAPIProvider from "./components/Providers/PublicAPIProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import GoalProvider from "./components/Providers/GoalProvider";
import ExerciseProvider from "./components/Providers/ExerciseProvider";

const handleSubmit = async (e) => {
  e.preventDefault();
  const response = await login(formData);
  if (response.user) {
    setConnectedUser(response.user);
    toast.success("Login successful!");
  } else {
    toast.error("Login failed. Please check your credentials.");
  }
};

function App() {
  return (
    <div
      className={`mhFull
     ${styles.main}`}
    >
      <UserProvider>
        <WorkoutProvider>
          <NutritionProvider>
            <PublicAPIProvider>
              <GoalProvider>
                <ExerciseProvider>
                  <Header />
                  <Outlet />
                  <Footer />
                  <ScrollRestoration />
                  <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar
                  />
                </ExerciseProvider>
              </GoalProvider>
            </PublicAPIProvider>
          </NutritionProvider>
        </WorkoutProvider>
      </UserProvider>
    </div>
  );
}

export default App;
