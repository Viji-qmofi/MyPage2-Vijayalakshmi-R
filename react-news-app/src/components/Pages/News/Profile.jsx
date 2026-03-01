import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import api from "../../../api/axios.js";
import { AuthContext } from "../../../context/AuthContext.jsx";
import "../../../styles/Auth.css";
export default function Profile() {
  const { user, token, login } = useContext(AuthContext);
  const navigate = useNavigate();

  // Prefill form with current user values
  const [form, setForm] = useState({
    fullName: "",
    city: "",
    country: "",
  });

  // Profile image preview URL
  const [preview, setPreview] = useState("");

  const nameRef = useRef(null);

  useEffect(() => {
    if (user) {
      setForm({
        fullName: user.fullName || "",
        city: user.preferredCity || "",
        country: user.country || "",
      });
      setPreview(user.profilePic || ""); // Show current image if exists
    }

    // Auto-focus on name input
    nameRef.current?.focus();
  }, [user]);

  const validate = () => {
    const errors = {};
    if (!form.fullName.trim()) errors.fullName = "Full Name is required";
    if (!form.city.trim()) errors.city = "City is required";
    if (!form.country.trim()) errors.country = "Country is required";
    return errors;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file)); // preview
      setForm({ ...form, profilePicFile: file }); // store file temporarily
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      Swal.fire({
        icon: "error",
        title: "Validation Failed",
        text: Object.values(errors).join(", "),
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("fullName", form.fullName);
      formData.append("city", form.city);
      formData.append("country", form.country);
      if (form.profilePicFile) formData.append("profilePic", form.profilePicFile);

      const res = await api.put("/auth/update-profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Update AuthContext
      login({ ...user, ...res.data }, token);

      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Your details have been updated successfully",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: err.response?.data?.message || "Could not update profile",
      });
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Edit Profile</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          {/* Profile image */}
          <div className="profile-pic-container">
            {preview && (
              <img
                src={preview}
                alt="Profile"
                className="profile-preview"
              />
            )}
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </div>

          {/* Name input */}
          <input
            ref={nameRef}
            type="text"
            placeholder="Full Name"
            className="auth-input"
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          />

          {/* City input */}
          <input
            type="text"
            placeholder="City"
            className="auth-input"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
          />

          {/* Country input */}
          <input
            type="text"
            placeholder="Country"
            className="auth-input"
            value={form.country}
            onChange={(e) => setForm({ ...form, country: e.target.value })}
          />

          <button type="submit" className="auth-button">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}