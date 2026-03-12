import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import Swal from "sweetalert2";
import api from "../api/axios";
import "../styles/Auth.css";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token") || "";

  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!token) newErrors.token = "Missing or invalid reset token";

    if (!form.password.trim()) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!form.confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await api.post("/auth/reset-password", {
        token,
        password: form.password,
      });

      Swal.fire({
        icon: "success",
        title: "Password Reset Successful",
        text:
          response.data?.message ||
          "You can now log in with your new password",
      });

      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Reset Failed",
        text: error.response?.data?.message || "Could not reset password",
      });
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2 className="profile-title">Reset Password</h2>

        <form className="profile-form" onSubmit={handleSubmit}>
          <input
            type="password"
            className="profile-input"
            placeholder="New Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          {errors.password && <span className="error">{errors.password}</span>}

          <input
            type="password"
            className="profile-input"
            placeholder="Confirm New Password"
            value={form.confirmPassword}
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
          />
          {errors.confirmPassword && (
            <span className="error">{errors.confirmPassword}</span>
          )}

          {errors.token && <span className="error">{errors.token}</span>}

          <button type="submit" className="profile-button">
            Reset Password
          </button>
        </form>

        <div className="profile-link">
          <span onClick={() => navigate("/")}>Back to Login</span>
        </div>
      </div>
    </div>
  );
}