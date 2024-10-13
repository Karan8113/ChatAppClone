import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast"

const Signup = () => {
  const [user, setUser] = useState({
    fullName: "",
    userName: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const Navigate =useNavigate();

  const handleGender = (gender) => {
    setUser({ ...user, gender: gender });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(user);

    try {
      console.log(user);
      const res = await axios.post(
        "http://localhost:8080/api/v1/user/register",
        user,
        {
          headers: { 
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      Navigate("/login")
      toast.success(res.data.message);
      console.log(res);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }

    setUser({
      fullName: "",
      userName: "",
      password: "",
      confirmPassword: "",
      gender: "",
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
          Register
        </h1>

        <form onSubmit={onSubmitHandler} action="">
          <div>
            <label className="label p-2">
              <span className="text-base label-text  text-gray-900">
                Full Name
              </span>
            </label>
            <input
              value={user.fullName}
              onChange={(e) => setUser({ ...user, fullName: e.target.value })}
              className="w-full input input-bordered h-10"
              type="text"
              placeholder="Full Name"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text  text-gray-900">
                Username
              </span>
            </label>
            <input
              value={user.userName}
              onChange={(e) => setUser({ ...user, userName: e.target.value })}
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
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="w-full input input-bordered h-10"
              type="password"
              placeholder="Password"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text  text-gray-900">
                Confirm Password
              </span>
            </label>
            <input
              value={user.confirmPassword}
              onChange={(e) =>
                setUser({ ...user, confirmPassword: e.target.value })
              }
              className="w-full input input-bordered h-10"
              type="password"
              placeholder="Confirm Password"
            />
          </div>
          <div className="flex items-center my-4">
            <div className="flex items-center">
              <p className="text-gray-900">Male</p>
              <input
                type="checkbox"
                checked={user.gender === "male"}
                onChange={() => handleGender("male")}
                
                className="checkbox mx-2"
              />
            </div>
            <div className="flex items-center">
              <p className="text-gray-900">Female</p>
              <input
                type="checkbox"
                checked={user.gender === "female"}
                onChange={() => handleGender("female")}
                
                className="checkbox mx-2"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="btn w-full btn-sm mt-2 border border-s-yellow-700"
            >
              Register
            </button>
          </div>
          <Link to={"/login"}>
            <p className="text-blue-900 my-4 text-center font-bold">
              Already have an account ? Login
            </p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
