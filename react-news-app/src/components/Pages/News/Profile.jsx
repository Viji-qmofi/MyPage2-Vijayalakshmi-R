import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import api from "../../../api/axios.js";
import { AuthContext } from "../../../context/AuthContext.jsx";
import "../../../styles/Auth.css";


export default function Profile() {
  const { user, token, login, profilePic, setProfilePic } = useContext(AuthContext);

  // Refs for auto-focus
  const nameRef = useRef(null);
  const navigate = useNavigate();

  // State for editable fields
  const [form, setForm] = useState({
    fullName: "",
    city: "",
    country: "",
  });

  

  useEffect(() => {
    // Load initial user info
    if (user) {
      setForm({
        fullName: user.fullName || "",
        city: user.preferredCity || "",
        country: user.country || "",
      });
    }

    // Load profile pic from localStorage
    const savedPic = localStorage.getItem("profilePic");
    if (savedPic) setProfilePic(savedPic);

    // Auto-focus on fullName input
    nameRef.current?.focus();
  }, [user]);

  // Handle profile pic selection
  const handlePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result); // Base64 string
        localStorage.setItem("profilePic", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put(
        "/auth/update-profile",
        {
          fullName: form.fullName,
          city: form.city,
          country: form.country,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Update AuthContext user info
      login(
        {
          ...user,
          fullName: res.data.fullName,
          preferredCity: res.data.city,
          country: res.data.country,
        },
        token
      );

      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Your profile information has been successfully updated.",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        navigate("/news");
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: err.response?.data?.message || "Something went wrong!",
      });
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Edit Profile</h2>
        <div className="profile-pic-section">
        <img
          src={profilePic || "https://via.placeholder.com/150"}
          alt="Profile"
          className="profile-pic"
        />
        <input type="file" accept="image/*" onChange={handlePicChange} />
      </div>
        <form className="auth-form" onSubmit={handleUpdate}>
         
          {/* Name input */}
          <input
            ref={nameRef}
            type="text"
            name="fullName"
            placeholder="Full Name"
            className="auth-input"
            value={form.fullName}
            onChange={handleChange}
          />

          {/* City input */}
          <input
            type="text"
            name="city"
            placeholder="City"
            className="auth-input"
            value={form.city}
            onChange={handleChange}
          />

          {/* Country input */}
          <input
            type="text"
            name="country"
            placeholder="Country"
            className="auth-input"
            value={form.country}
            onChange={handleChange}
          />

          <button type="submit" className="auth-button">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}