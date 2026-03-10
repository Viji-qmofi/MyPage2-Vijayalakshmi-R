import { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import api from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";
import "../../styles/Auth.css";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const usernameRef = useRef(null);

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  const validate = () => {
    const newErrors = {};

    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Invalid email format";

    if (!form.password.trim()) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await api.post("/auth/login", form);
      const { token, user } = response.data;
      login(user, token);
      navigate("/news");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.response?.data?.message || "Invalid email or password",
      });
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  const handleGithubLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/github";
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2 className="profile-title">Welcome Back</h2>

        <form className="profile-form" onSubmit={handleSubmit}>
          <input
            ref={usernameRef}
            type="email"
            className="profile-input"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          {errors.email && <span className="error">{errors.email}</span>}

          <input
            type="password"
            className="profile-input"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          {errors.password && <span className="error">{errors.password}</span>}

          <button type="submit" className="profile-button">
            Login
          </button>
        </form>

        <div className="profile-buttons" style={{ marginTop: "12px", display: "flex", flexDirection: "column", gap: "10px" }}>
          <button type="button" className="profile-button" onClick={handleGoogleLogin}>
            Continue with Google
          </button>

          <button type="button" className="profile-button" onClick={handleGithubLogin}>
            Continue with GitHub
          </button>
        </div>

        <div className="profile-link">
          <span onClick={() => navigate("/forgot-password")}>
            Forgot Password?
          </span>
        </div>

        <div className="profile-link">
          Don't have an account?{" "}
          <span onClick={() => navigate("/register")}>Register</span>
        </div>
      </div>
    </div>
  );
}