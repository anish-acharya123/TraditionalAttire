import React from "react";
import AdminAddProductForm from "../Admin/AddProduct";
import { useAuth } from "../context/UserAuthContext";
import UserP from "./UserP";
import AdminDashboard from "../Admin/AdminDashboard";

// import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { role } = useAuth();
  console.log(role);
  return (
    <div>
      {role == "admin" && <AdminDashboard />}
      {role == "user" && <UserP />}
    </div>
  );
};

export default Profile;
