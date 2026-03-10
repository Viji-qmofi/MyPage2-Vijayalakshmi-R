import { useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import api from "../../api/axios";
import "../../styles/Auth.css";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const validate = () => {
    if (!email.trim()) {
      setError("Email is required");
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Invalid email format");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await api.post("/auth/forgot-password", { email });

      Swal.fire({
        icon: "success",
        title: "Check your email",
        text:
          response.data?.message ||
          "If that email is registered, a reset link has been sent.",
      });

      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Request Failed",
        text:
          error.response?.data?.message ||
          "Unable to process forgot password request",
      });
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2 className="profile-title">Forgot Password</h2>

        <form className="profile-form" onSubmit={handleSubmit}>
          <input
            type="email"
            className="profile-input"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && <span className="error">{error}</span>}

          <button type="submit" className="profile-button">
            Send Reset Link
          </button>
        </form>

        <div className="profile-link">
          <span onClick={() => navigate("/")}>Back to Login</span>
        </div>
      </div>
    </div>
  );
}