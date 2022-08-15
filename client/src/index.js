import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { WorkoutContextProvider } from "./context/WorkoutContext";
import { AuthContextProvider } from "./context/AuthContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode> // if you uncomment this tooltip won't work
  <AuthContextProvider>
    <WorkoutContextProvider>
      <App />
    </WorkoutContextProvider>
  </AuthContextProvider>
  // </React.StrictMode>
);
