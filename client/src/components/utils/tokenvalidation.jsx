import axios from "axios";

 export  const validateToken = async () => {
  try {
    const userResponse = await axios.get(
      "http://localhost:2000/user/usertoken-validate",
      { withCredentials: true }
    );

    
    if (userResponse.data.isValid) {
      return {
        isValid: true,
        role: userResponse.data.role,
       
      };
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.log("User token validation failed, checking admin token...");
    } else {
      console.error("User token validation error:", error);
      return { isValid: false, role: null };
    }
  }

  try {
    const adminResponse = await axios.get(
      "http://localhost:2000/admin/admintoken-validate",
      { withCredentials: true }
    );

    if (adminResponse.data.isValid) {
      return {
        isValid: true,
        role: adminResponse.data.role,
        info: adminResponse.data.info,
      };
    }
  } catch (error) {
    console.error("Admin token validation error:", error);
    return { isValid: false, role: null };
  }

  return { isValid: false, role: null };
};
