import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [skills, setSkills] = useState(
    user?.skills ? user.skills.join(",") : ""
  );
  const [about, setAbout] = useState(user?.about || "");

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    const newUserSkills = skills
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    try {
      const res = await axios.patch(
        "/api/profile/edit",
        {
          photoUrl,
          firstName,
          lastName,
          age,
          gender,
          skills: newUserSkills,
          about,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data));

      toast.success(res.data.message || "Profile updated successfully!", {
        position: "top-center",
        autoClose: 3000,
      });
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to update profile",
        {
          position: "top-center",
          autoClose: 3000,
        }
      );
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center gap-[10vw]">
      <div className="flex flex-col items-center justify-center max-lg:w-full">
        <h1 className="text-[1.4vw]">Edit Profile</h1>

        <div className="card bg-[#fde825] text-neutral-content w-96 rounded-lg">
          <div className="card-body items-center text-center">
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              className="input input-bordered w-full max-w-xs rounded-md text-black"
            />

            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              className="input input-bordered w-full max-w-xs rounded-md text-black"
            />

            <input
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              placeholder="Photo URL"
              className="input input-bordered w-full max-w-xs rounded-md text-black"
            />

            <input
              value={age}
              onChange={(e) => setAge(e.target.value)}
              type="number"
              placeholder="Age"
              className="input input-bordered w-full max-w-xs rounded-md text-black"
            />

            <input
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              placeholder="Gender"
              className="input input-bordered w-full max-w-xs rounded-md text-black"
            />

            <input
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="Skills (comma separated)"
              className="input input-bordered w-full max-w-xs rounded-md text-black"
            />

            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder="Tell people about you..."
              className="input input-bordered w-full h-[9vh] max-w-xs rounded-md text-black"
            />

            <button
              onClick={handleSubmit}
              className="btn btn-base-content rounded-md px-[2vw] mt-4"
            >
              Submit
            </button>
          </div>
        </div>
      </div>

      <UserCard
        feed={{ photoUrl, firstName, lastName, age, gender, skills, about }}
      />
    </div>
  );
};

export default EditProfile;
