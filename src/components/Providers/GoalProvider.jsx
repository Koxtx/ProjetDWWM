import React, { useContext, useEffect, useState } from "react";
import { postGoal, putGoal, getGoals } from "../../apis/goals";
import { UserContext } from "../../context/UserContext";
import { GoalContext } from "../../context/GoalContext";

export default function GoalProvider({ children }) {
  const { token } = useContext(UserContext);
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchGoals = async () => {
      setLoading(true);
      if (token) {
        const response = await getGoals(token);
        setGoals(response);
      }
      setLoading(false);
    };
    fetchGoals();
  }, []);

  const addGoal = async (goalData) => {
    const response = await postGoal(goalData, token);
    setGoals([...goals, response]);
  };

  const updateGoal = async (goalId, progress) => {
    const response = await putGoal(goalId, progress, token);
    setGoals(goals.map((goal) => (goal._id === goalId ? response : goal)));
  };

  return (
    <GoalContext.Provider value={{ goals, addGoal, updateGoal, loading }}>
      {children}
    </GoalContext.Provider>
  );
}
