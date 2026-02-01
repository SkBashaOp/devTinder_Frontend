import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../store/feedSlice";
import Shimmer from "./Shimmer";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;

    try {
      const res = await axios.get(
        "/api/user/feed",
        { withCredentials: true }
      );

      dispatch(addFeed(res?.data?.data));
    } catch (error) {
      console.error("Failed to load feed", error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) {
    return (
      <div className="w-full h-screen flex justify-center pt-[15vh]">
        <Shimmer />
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center items-start my-[15vh]">
      <UserCard feed={feed} />
    </div>
  );
};

export default Feed;
