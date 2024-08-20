import React, { useContext, useEffect, useState } from "react";
import {
  getExercises,
  postExercise,
  putExercise,
  deleteExercise,
} from "../../apis/exercises";
import { UserContext } from "../../context/UserContext";
import { ExerciseContext } from "../../context/ExerciseContext";

export default function ExerciseProvider({ children }) {
  const { token } = useContext(UserContext);
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchExercises = async () => {
      setLoading(true);
      const response = await getExercises();
      setExercises(response);
      setLoading(false);
    };
    fetchExercises();
  }, []);

  const addExercise = async (exerciseData) => {
    const response = await postExercise(exerciseData, token);
    setExercises([...exercises, response]);
  };

  const updateExercise = async (exerciseId, exerciseData) => {
    const response = await putExercise(exerciseId, exerciseData, token);
    setExercises(
      exercises.map((ex) => (ex._id === exerciseId ? response : ex))
    );
  };

  const removeExercise = async (exerciseId) => {
    await deleteExercise(exerciseId, token);
    setExercises(exercises.filter((ex) => ex._id !== exerciseId));
  };

  return (
    <ExerciseContext.Provider
      value={{
        exercises,
        addExercise,
        updateExercise,
        removeExercise,
        loading,
      }}
    >
      {children}
    </ExerciseContext.Provider>
  );
}
