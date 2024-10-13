import React from "react";
import "./Styles/OtheruserStyle.css";
import Oneuser from "./Oneuser";
import useGetOtherUsers from "../hooks/useGetOtherUsers";
import { useSelector } from "react-redux";

const Otheruser = () => {
  useGetOtherUsers();

  const { otherUsers } = useSelector((store) => store.user);

  // if we did'nt get otherUsers then we simply return from this line
  // this is called the early return

  if (!otherUsers) return;

  return (
    <div className="otherUserContainer">
      {otherUsers?.map((user) => {
        return (
          <div key={user._id}>
            <Oneuser user={user} />
            <hr className="mt-2" /> {/* Horizontal line after each component */}
          </div>
        );
      })}
    </div>
  );
};

export default Otheruser;
