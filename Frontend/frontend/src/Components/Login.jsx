import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link,useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux"
import { setAuthUser } from '../Redux/userSlice';

const Login = () => {

  const [user, setUser] = useState({
    userName: "",
    password: "",
  });

  // hooks
  const dispatch = useDispatch();
  const Navigate = useNavigate();


  const onSubmitHandler = async(e) => {
    e.preventDefault();
    // console.log(user);

    try {
      const res = await axios.post("http://localhost:8080/api/v1/user/login",
      user,
      {
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true
      }) 
      
      // console.log(res.data.profilePhoto);
      dispatch(setAuthUser(res.data));
      localStorage.setItem("authUser",JSON.stringify(res.data))
      
      Navigate("/home");
      toast.success("Login Succesfull..");
      
    } catch (error) {
      toast.error(error.response.data.message);
      console.log("error  ",error);
    }

    setUser({
      userName: "",
      password: "",
    });
  };
  return (
    <div className="min-w-96 mx-auto">
      <div
        className="
w-full p-6 rounded-lg bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100
"
      >
        <h1 className="text-3xl font-bold text-center text-gray-700">
         Login
        </h1>

        <form onSubmit={onSubmitHandler} action="">
          
          <div>
            <label className="label p-2">
              <span className="text-base label-text  text-gray-900">
                Username
              </span>
            </label>
            <input
              value={user.userName}
              onChange={(e)=>setUser({...user,userName:e.target.value})}
              className="w-full input input-bordered h-10"
              type="text"
              placeholder="Username"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text  text-gray-900">
                Password
              </span>
            </label>
            <input
              value={user.password}
              onChange={(e)=>setUser({...user,password:e.target.value})}
              className="w-full input input-bordered h-10"
              type="password"
              placeholder="Password"
            />
          </div>
       
          
          <div>
            <button type="submit" className="btn w-full btn-sm mt-10 border border-s-yellow-700">Login</button>
          </div>
          <Link to={"/register"}>
            <p className="text-blue-900 my-4 text-center font-bold">Don't have an account ? Register</p>
          </Link>
          
        </form>
      </div>
    </div>
  );
}

export default Login