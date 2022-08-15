const express = require("express");
const router = express.Router();
const {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutController");
const requireAuth = require("../middleware/requireAuth");

// require auth for all workout routes
router.use(requireAuth);

// get all workouts
router.get("/", getWorkouts);

// get a single workout
router.get("/:id", getWorkout);

// post a new workout
router.post("/", createWorkout);

// update a workout
router.patch("/:id", updateWorkout);

// delete a new workout
router.delete("/:id", deleteWorkout);

module.exports = router;
