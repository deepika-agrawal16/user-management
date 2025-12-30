import { Navigate } from "react-router-dom";

const RoleRedirect = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (role === "admin") {
    return <Navigate to="/admin" />;
  }

  return <Navigate to="/profile" />;
};

export default RoleRedirect;
