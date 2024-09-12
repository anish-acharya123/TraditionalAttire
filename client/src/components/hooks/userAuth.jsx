import React from "react";
import { useNavigate } from "react-router-dom";

const userAuth = (isPublicRoute) => {
     const navigate = useNavigate();
  return (
    <div>
      <div>hello auth</div>
    </div>
  );
};

export default userAuth;
