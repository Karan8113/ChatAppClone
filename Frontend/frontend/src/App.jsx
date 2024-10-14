import Signup from "./Components/Signup.jsx";
// import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./Components/Home.jsx";
import Login from "./Components/Login.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setAuthUser } from "./Redux/userSlice.js";
import Home from "./Components/Home.jsx";
// import { useSelector } from 'react-redux';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },{
    path:"/home",
    element:<Home/>,
  },
]);

function App() {

  const dispatch = useDispatch();
  // const {authUser } = useSelector((store) => store.user);
  
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
