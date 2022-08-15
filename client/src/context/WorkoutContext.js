import { createContext, useReducer } from "react";
export const WorkoutContext = createContext();

export const workoutsReducer = (state, action) => {
  switch (action.type) {
    case "SET_WORKOUTS":
      return {
        workouts: action.payload,
      };
    case "CREATE_WORKOUT":
      return {
        workouts: [action.payload, ...state.workouts],
      };
    case "DELETE_WORKOUT":
      return {
        workouts: state.workouts.filter((w) => w._id !== action.payload._id),
      };
    case "UPDATE_WORKOUT":
      return {
        workouts: state.workouts.map((w) =>
          w._id === action.payload._id ? action.payload : w
        ),
      };
    default:
      return state;
  }
};

export function WorkoutContextProvider({ children }) {
  const [state, dispatch] = useReducer(workoutsReducer, { workouts: [] });

  return (
    <WorkoutContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutContext.Provider>
  );
}

export default WorkoutContext;
