import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/auth.css";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login", form);

      
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role); 

      
      if (res.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/profile");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-card">
        <h2>Login</h2>

        {error && <p className="error">{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>

        <p className="switch-auth">
          Don’t have an account? <a href="/signup">Signup</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
