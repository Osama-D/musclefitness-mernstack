import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const { dispatch } = useAuthContext();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [successuser, setSuccessuser] = useState(false);

  const signup = async (email, password) => {
    setIsLoading(true);
    setError(null);
    setSuccessuser(false);
    const response = await fetch(
      "https://musclefitness-mern-stack.herokuapp.com/api/user/signup",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );
    const json = await response.json();
    if (!response.ok) {
      setSuccessuser(false);
      setIsLoading(false);
      setError(json.error);
      setSuccessuser(false);
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));
      // update the auth context
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
      setSuccessuser(true);
      setError(null);
    }
  };
  return { signup, isLoading, error, successuser };
};
