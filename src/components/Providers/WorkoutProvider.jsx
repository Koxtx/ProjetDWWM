import { WorkoutsContext } from "../../context/WorkoutsContext";
import { postWorkout, getWorkouts } from "../../apis/workouts";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";

export default function WorkoutsProvider({ children }) {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useContext(UserContext);

  const fetchWorkouts = async (
    page = 1,
    limit = 10,
    sortBy = "date",
    order = "asc"
  ) => {
    setLoading(true);
    if (token) {
      // Assurez-vous que le token est disponible
      const response = await getWorkouts(page, limit, sortBy, order, token);
      setWorkouts(response.workouts || []);
    } else {
      console.error("No token available");
    }
    setLoading(false);
  };

  const addWorkout = async (workoutData) => {
    setLoading(true);
    if (token) {
      try {
        const response = await postWorkout(workoutData, token);
        setWorkouts((prevWorkouts) => [...prevWorkouts, response]);
      } catch (error) {
        console.error(error.message);
      }
    } else {
      console.error("No token available");
    }
    setLoading(false);
  };

  return (
    <WorkoutsContext.Provider
      value={{ workouts, fetchWorkouts, addWorkout, loading }}
    >
      {children}
    </WorkoutsContext.Provider>
  );
}
