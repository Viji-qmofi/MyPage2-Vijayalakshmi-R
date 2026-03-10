import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import api from "../../../api/axios.js";
import { AuthContext } from "../../../context/AuthContext.jsx";
import "../../../styles/Auth.css";


export default function EditProfile() {
  const { user, login } = useContext(AuthContext);
  const navigate = useNavigate();
  const nameRef = useRef(null);

  // Form state
  const [form, setForm] = useState({
    fullName: "",
    city: "",
    country: "",
  });

  // Profile pic state
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState(null);

  // Load user data whenever context updates
  useEffect(() => {
    if (user) {
      setForm({
        fullName: user.fullName || "",
        city: user.city || "",
        country: user.country || "",
      });

      setProfilePicPreview(
        user.profilePicUrl ? `http://localhost:8080${user.profilePicUrl}` : null
      );
    }
    nameRef.current?.focus();
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setProfilePicPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("fullName", form.fullName);
      data.append("city", form.city);
      data.append("country", form.country);
      if (profilePicFile) data.append("profilePic", profilePicFile);

      const res = await api.put("/auth/update-profile", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Update context user immediately with new backend data
      login(res.data);

      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Your profile information has been successfully updated.",
      });

      navigate("/categories/home"); // Go back to News page
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: err.response?.data?.message || "Something went wrong!",
      });
    }
  };

const handleCancel = () => {
  Swal.fire({
    title: "Discard changes?",
    text: "Your updates will not be saved.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, go back",
  }).then((result) => {
    if (result.isConfirmed) {
      navigate("/news");
    }
  });
};

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2 className="profile-title">Edit Profile</h2>

        {/* Profile picture */}
        <div className="profile-pic-section">
          <img
            src={profilePicPreview || "https://via.placeholder.com/150"}
            alt="Profile"
            className="profile-pic"
          />
          <input type="file" accept="image/*" onChange={handlePicChange} />
        </div>

        {/* Profile form */}
        <form 
        className="profile-form" 
        onSubmit={handleUpdate}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
        >
          <input
            ref={nameRef}
            type="text"
            name="fullName"
            placeholder="Full Name"
            className="profile-input"
            value={form.fullName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            className="profile-input"
            value={form.city}
            onChange={handleChange}
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            className="profile-input"
            value={form.country}
            onChange={handleChange}
          />
          <div className="profile-buttons">
          <button 
          type="submit" 
          className="profile-button"
          >
            Update Profile
          </button>

          <button
            type="button"
            className="profile-button"
            onClick={handleCancel}
          >
            Cancel
          </button>
          </div>
        </form>
      </div>
    </div>
  );
}