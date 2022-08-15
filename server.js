require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");
// express app
const app = express();

//middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method, req.headers);
  next();
});
// routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

// Server production assests
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
  });
}
// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT || 5000, () => {
      console.log(`connected to db & listening on port 5000!!`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
