import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import "./Header.css";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

 

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
   <header className={`news-header ${!user ? "auth-header" : ""}`}>
      <h1 className="logo">MyPage - The daily source of wisdom</h1>

      {user && (
        <button className="logout-btn" onClick={handleLogout}>
          Log Out
        </button>
      )}
    </header>
  );
};

export default Header;