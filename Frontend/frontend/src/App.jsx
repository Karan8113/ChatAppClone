import Signup from "./Components/Signup.jsx";
// import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./Components/Home.jsx";
import Login from "./Components/Login.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setAuthUser } from "./Redux/userSlice.js";


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/register",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {

  const dispatch = useDispatch();
  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      dispatch(setAuthUser(JSON.parse(storedUser))); // Restore user state
    }
  }, [dispatch]);

  


  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
