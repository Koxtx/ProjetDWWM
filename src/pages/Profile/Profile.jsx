import React from "react";
import Dashboard from "../../components/Dashboard/Dashboard";
import PaginatedWorkoutList from "../../components/Dashboard/PaginatedWorkoutList";

export default function Profile() {
  return (
    <main>
      <h2>Profile</h2>
      <Dashboard />
      <PaginatedWorkoutList />
    </main>
  );
}
