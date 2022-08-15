import React, { useState } from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useWorkoutsContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";

function WorkoutDetails({ workout }) {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  const handleClick = async () => {
    if (!user) {
      return;
    }
    const response = await fetch(
      "https://musclefitness-mern-stack.herokuapp.com/api/workouts/" +
        workout._id,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };

  const [title, settitle] = useState("");
  const [load, setload] = useState("");
  const [reps, setreps] = useState("");
  const [popup, setpopup] = useState(false);
  const [err, seterr] = useState(null);

  const handleClick2 = async (e) => {
    e.preventDefault();
    if (!user) {
      return;
    }
    const workouts = { title, load, reps };
    const response2 = await fetch(
      "https://musclefitness-mern-stack.herokuapp.com/api/workouts/" +
        workout._id,
      {
        method: "PATCH",
        body: JSON.stringify(workouts),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response2.json();
    if (!response2.ok) {
      seterr(json.error);
    }
    if (response2.ok) {
      setpopup(false);
      settitle("");
      setload("");
      setreps("");
      dispatch({ type: "UPDATE_WORKOUT", payload: json });
      seterr(null);
    }
  };

  return (
    <div className="">
      <div>
        {popup && (
          <div className="cancel" onClick={() => setpopup(false)}></div>
        )}
        <div className={popup ? "scalein" : "scaleout"}>
          <div className="update-details">
            <form className="update-content" onSubmit={handleClick2}>
              <h3>Update workout</h3>
              <label>Exercize Title</label>
              <input
                type="text"
                onChange={(e) => settitle(e.target.value)}
                value={title}
                placeholder={workout.title}
              />
              <label>Load in (Kg):</label>
              <input
                type="number"
                onChange={(e) => setload(e.target.value)}
                value={load}
                min="0"
                placeholder={workout.load}
              />
              <label>Reps</label>
              <input
                type="number"
                onChange={(e) => setreps(e.target.value)}
                value={reps}
                min="0"
                placeholder={workout.reps}
              />
              <button>Update workout</button>
              {err && <div className="error">{err}</div>}
            </form>
          </div>
        </div>
      </div>
      <div className="workout-details">
        <h4>{workout.title}</h4>
        <p>
          <strong>Load (Kg): </strong>
          {workout.load}
        </p>
        <p>
          <strong>Reps: </strong>
          {workout.reps}
        </p>
        <p>
          {formatDistanceToNow(new Date(workout.createdAt), {
            addSuffix: true,
          })}
        </p>
        <div className="options">
          <div
            className="material-symbols-outlined delete"
            style={{ backgroundColor: "#e7195a", color: "white" }}
            onClick={handleClick}
          >
            delete
          </div>
          <div
            className="material-symbols-outlined update"
            style={{ backgroundColor: "#1aac83", color: "white" }}
            onClick={() => setpopup(true)}
          >
            update
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkoutDetails;
