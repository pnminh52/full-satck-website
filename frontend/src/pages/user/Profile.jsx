import React from "react";
import useAuth from "../../hook/useAuth";
import { useNavigate } from "react-router-dom";
import useToast from "../../hook/useToast";
import ProfileCard from './../../components/user/profile/ProfileCard';
import UserMenu from './../../components/user/profile/UserMenu';
const Profile = () => {
  const toast = useToast();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handdleLogOut = () => {
    logout();
    navigate("/");
    toast.success("Logout successful!");
  };

  return (
    <div className="max-w-screen-xl sm:px-60 px-4 mx-auto ">
      <div className="py-6 space-y-6 ">
        <p className="text-2xl font-semibold">My Account</p>
        <ProfileCard />
       <UserMenu handdleLogOut={handdleLogOut}/>
      </div>
    
    </div>
  );
};

export default Profile;
