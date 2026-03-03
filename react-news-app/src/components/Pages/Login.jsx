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

  // Auto focus
  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  const validate = () => {
    const newErrors = {};

    if (!form.email.trim())
      newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Invalid email format";

    if (!form.password.trim())
      newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await api.post("/auth/login", form);

      

      console.log("Login API response:", response.data);

      const { token, user } = response.data;

      // Save user & token in context & localStorage
      login(user, token);

      // Navigate to News page
      navigate("/news");
    } catch (error) {
      console.error("Login error:", error);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.response?.data?.message || "Invalid email or password",
      });
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Welcome Back</h2>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            ref={usernameRef}
            type="email"
            className="auth-input"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          {errors.email && <span className="error">{errors.email}</span>}

          <input
            type="password"
            className="auth-input"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          {errors.password && <span className="error">{errors.password}</span>}

          <button type="submit" className="auth-button">
            Login
          </button>
        </form>

        <div className="auth-link">
          Don't have an account?{" "}
          <span onClick={() => navigate("/register")}>Register</span>
        </div>
      </div>
    </div>
  );
}