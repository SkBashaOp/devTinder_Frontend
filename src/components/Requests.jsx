import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removRequestOnAccept } from "../store/requestSlice";
import Shimmer from "./Shimmer";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        "/api/user/request/received",
        { withCredentials: true }
      );

      dispatch(addRequest(res?.data?.allReceivedRequest));
    } catch (error) {
      console.error("Failed to fetch requests", error);
    }
  };

  const handleAcceptRequest = async (status, id) => {
    try {
      await axios.post(
        `/api/request/review/${status}/${id}`,
        {},
        { withCredentials: true }
      );

      dispatch(removRequestOnAccept(id));
    } catch (error) {
      console.error("Failed to update request", error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Shimmer />
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <h1>No connection request!!</h1>
      </div>
    );
  }

  return (
    <div className="w-full h-screen py-[2vw] px-[4vw] flex flex-col items-center gap-[2vh] max-lg:h-fit">
      {requests.map((request) => (
        <div className="w-[25vw] max-lg:w-full" key={request._id}>
          <div className="flex items-center bg-base-100 shadow-xl">
            <figure>
              <img
                src={request.fromUserId.photoUrl}
                alt="User"
                className="max-lg:w-[12vw] max-lg:h-[12vw] w-[4vw] h-[4vw] rounded-full"
              />
            </figure>

            <div className="card-body">
              <h2 className="card-title">
                {request.fromUserId.firstName}{" "}
                {request.fromUserId.lastName}
              </h2>

              <p>
                {request.fromUserId.age} {request.fromUserId.gender}
              </p>

              <p>{request.fromUserId.about}</p>

              <div className="card-actions justify-start">
                <button className="bg-gray-500 text-white px-[1vw] py-[.8vh] rounded-md">
                  Reject
                </button>

                <button
                  className="bg-gray-500 text-white px-[1vw] py-[.8vh] rounded-md"
                  onClick={() =>
                    handleAcceptRequest("accepted", request._id)
                  }
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Requests;
