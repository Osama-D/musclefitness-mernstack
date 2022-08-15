import React, { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";

function WorkoutForm() {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  const [title, settitle] = useState("");
  const [load, setload] = useState("");
  const [reps, setreps] = useState("");

  const [err, seterr] = useState(null);
  const [emptyFiels, setEmptyFields] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      seterr("You must be logged in");
      return;
    }
    const workout = { title, load, reps };
    const response = await fetch(
      "https://musclefitness-mern-stack.herokuapp.com/api/workouts",
      {
        method: "POST",
        body: JSON.stringify(workout),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();
    if (!response.ok) {
      seterr(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      settitle("");
      setload("");
      setreps("");
      setEmptyFields([]);
      seterr(null);
      dispatch({ type: "CREATE_WORKOUT", payload: json });
    }
  };
  return (
    <div>
      <form className="create" onSubmit={handleSubmit}>
        <h3 className="workouttitle">Add a new workout</h3>
        <label>Exercize Title</label>
        <input
          type="text"
          onChange={(e) => settitle(e.target.value)}
          value={title}
          className={emptyFiels?.includes("title") ? "error" : ""}
        />
        <label>Load in (Kg):</label>
        <input
          type="number"
          onChange={(e) => setload(e.target.value)}
          value={load}
          min="0"
          className={emptyFiels?.includes("load") ? "error" : ""}
        />
        <label>Reps</label>
        <input
          type="number"
          onChange={(e) => setreps(e.target.value)}
          value={reps}
          min="0"
          className={emptyFiels?.includes("reps") ? "error" : ""}
        />
        <button>Add workout</button>
        {err && <div className="error">{err}</div>}
      </form>
    </div>
  );
}

export default WorkoutForm;
