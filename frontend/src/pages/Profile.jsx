import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Input from "../components/Input";
import Button from "../components/Button";
import "../styles/common.css";

const Profile = () => {
  const [user, setUser] = useState(null);

  // Profile fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  // Password fields
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Fetch profile
  useEffect(() => {
    api.get("/user/profile").then((res) => {
      setUser(res.data.data);
      setFullName(res.data.data.fullName);
      setEmail(res.data.data.email);
    });
  }, []);

  // Update profile (name + email)
  const updateProfile = async () => {
    setError("");
    setMessage("");
    try {
      setLoading(true);
      await api.put("/user/profile", { fullName, email });
      setMessage("Profile updated successfully");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  // Change password
  const changePassword = async () => {
    setError("");
    setMessage("");

    if (!currentPassword || !newPassword) {
      return setError("All password fields are required");
    }

    try {
      setLoading(true);
      await api.put("/user/change-password", {
        currentPassword,
        newPassword,
      });

      setMessage("Password changed successfully");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  // Cancel changes
  const cancelChanges = () => {
    if (user) {
      setFullName(user.fullName);
      setEmail(user.email);
      setCurrentPassword("");
      setNewPassword("");
      setMessage("");
      setError("");
    }
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <div className="card">
          <h2>My Profile</h2>

          {message && <p className="alert-success">{message}</p>}
          {error && <p className="alert-error">{error}</p>}

          {/* Profile Info */}
          <Input
            label="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input label="Role" value={user?.role || ""} disabled />

          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <Button
              variant="primary"
              onClick={updateProfile}
              disabled={loading}
            >
              Save Changes
            </Button>

            <Button
              variant="secondary"
              onClick={cancelChanges}
              disabled={loading}
            >
              Cancel
            </Button>
          </div>
        </div>

        {/* Change Password Section */}
        <div className="card">
          <h3>Change Password</h3>

          <Input
            label="Current Password"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />

          <Input
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <Button
            variant="danger"
            onClick={changePassword}
            disabled={loading}
          >
            Change Password
          </Button>
        </div>
      </div>
    </>
  );
};

export default Profile;
