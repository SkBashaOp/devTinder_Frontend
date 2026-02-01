import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeUserFromFeed } from "../store/feedSlice";
import { toast } from "react-toastify";

const UserCard = () => {
  const dispatch = useDispatch();

  // 🔥 READ FROM REDUX
  const feed = useSelector((store) => store.feed);

  const handlePendingRequest = async (status, id) => {
    try {
      await axios.post(
        `/api/request/send/${status}/${id}`,
        {},
        { withCredentials: true }
      );

      // 🔥 THIS WILL NOW WORK
      dispatch(removeUserFromFeed(id));

      toast.success(status, {
        position: "top-center",
        autoClose: 3000,
      });
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Action failed",
        {
          position: "top-center",
          autoClose: 3000,
        }
      );
    }
  };

  if (!feed || feed.length === 0) {
    return (
      <div className="flex justify-center w-full h-screen">
        <h1>No new feed available.</h1>
      </div>
    );
  }

  const { photoUrl, firstName, lastName, age, gender, skills, about, _id } =
    feed[0];

  return (
    <div className="card bg-[#FFF248] w-96 shadow-xl rounded-2xl">
      <figure className="flex justify-center">
        <img src={photoUrl} alt="User" className="w-[8vw] rounded-xl" />
      </figure>

      <div className="card-body">
        <h2 className="card-title">{firstName} {lastName}</h2>
        <p>{age} | {gender}</p>
        <p>{about}</p>
        <p>Skills: {skills}</p>

        <div className="card-actions justify-between">
          <button
            className="btn btn-error"
            onClick={() => handlePendingRequest("ignored", _id)}
          >
            Ignore
          </button>

          <button
            className="btn btn-primary"
            onClick={() => handlePendingRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
