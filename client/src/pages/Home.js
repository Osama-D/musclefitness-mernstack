import React, { useEffect, useState } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutsContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";
import nodata from "../components/svg/No data-rafiki.svg";

function Home() {
  const { workouts, dispatch } = useWorkoutsContext();
  const [status, setStatus] = useState(true); // idle - pending - success - failed
  const { user } = useAuthContext();
  useEffect(() => {
    const fetchWorkout = async () => {
      setStatus(true);
      try {
        const response = await fetch(
          "https://musclefitness-mern-stack.herokuapp.com/api/workouts",
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        const json = await response.json();
        dispatch({ type: "SET_WORKOUTS", payload: json });
        setStatus(false);
      } catch (error) {
        setStatus(true);
      }
    };
    if (user) {
      fetchWorkout();
    }
  }, [dispatch, user]);

  const [search, setsearch] = useState("");

  function filteringdata(val, search) {
    const data = val.filter((val) =>
      search ? val.title.toLowerCase().match(search.toLowerCase()) : val
    );
    return data;
  }
  return (
    <div className="home">
      <div className="workouts">
        <div className="search">
          <input
            value={search}
            onChange={(e) => setsearch(e.target.value)}
            className="searchinput"
            type="text"
            placeholder="Search..."
          />
          <div className="material-symbols-outlined searchicon">search</div>
        </div>
        {!status ? (
          filteringdata(workouts, search).length > 0 ? (
            filteringdata(workouts, search).map((workout) => (
              <WorkoutDetails key={workout._id} workout={workout} />
            ))
          ) : (
            <div className="nodata">
              <img alt="no data" src={nodata} />
            </div>
          )
        ) : (
          <div className="loader"></div>
        )}
      </div>
      <WorkoutForm />
    </div>
  );
}

export default Home;
