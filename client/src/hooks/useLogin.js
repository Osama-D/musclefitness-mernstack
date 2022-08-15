import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const { dispatch } = useAuthContext();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [successuser, setSuccessuser] = useState(false);

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    setSuccessuser(false);

    const response = await fetch(
      "https://musclefitness-mern-stack.herokuapp.com/api/user/login",
      {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );
    const json = await response.json();
    console.log("json", json);
    if (!response.ok) {
      console.log("json1", json);
      setSuccessuser(false);
      setIsLoading(false);
      setError(json.error);
      setSuccessuser(false);
    }

    if (response.ok) {
      console.log("json2", json);
      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      // update the auth context
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
      setSuccessuser(true);
      setError(null);
    }
  };
  return { login, isLoading, error, successuser };
};
