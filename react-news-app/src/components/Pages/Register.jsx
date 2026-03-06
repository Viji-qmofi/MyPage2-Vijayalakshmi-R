import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import api from "../../api/axios.js"
import "../../styles/Auth.css";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
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

    if (!form.fullName.trim())
      newErrors.fullName = "Full name is required";

    if (!form.email.trim())
      newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Invalid email format";

    if (!form.password.trim())
      newErrors.password = "Password is required";
    else if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await api.post("/auth/register", form);

      await Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: "Please login to continue",
        confirmButtonColor: "#6877f4",
      });

      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text:
          error.response?.data?.message ||
          "Something went wrong",
      });
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2 className="profile-title">Create Account</h2>
            <form className="profile-form" onSubmit={handleSubmit}>       

            <input
            ref={usernameRef}
            type="text"
            className="profile-input"
            placeholder="Full Name"
            value={form.fullName}
            onChange={(e) =>
                  setForm({ ...form, fullName: e.target.value })
            }
            />
            {errors.fullName && (
            <span className="error">{errors.fullName}</span>
            )}

            <input
            type="email"
            className="profile-input"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
            }
            />
            {errors.email && (
            <span className="error">{errors.email}</span>
            )}

            <input
            type="text"
            name="city"
            placeholder="Preferred City"
            className="profile-input"
            onChange={(e) =>
                  setForm({ ...form, city: e.target.value })
            }
          />

          <input
            type="text"
            name="country"
            placeholder="Country"
            className="profile-input"
            onChange={(e) =>
                  setForm({ ...form, country: e.target.value })
            }
          />

            <input
            type="password"
            className="profile-input"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
            }
            />
            {errors.password && (
            <span className="error">{errors.password}</span>
            )}

            <button type="submit" className="profile-button">
                  Register
            </button>
      </form>

        <div className="profile-link">
          Already have an account?{" "}
          <span onClick={() => navigate("/")}>
            Login
          </span>
        </div>
      </div>
    </div>
  );
}