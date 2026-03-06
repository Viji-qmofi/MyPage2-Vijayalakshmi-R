import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user") || "null")
  );

  // Sync token & user with localStorage
  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");

    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [token, user]);

  // login: update user info and optionally token
  const login = (userData, jwtToken = null) => {
    
  const updatedUser = {
    email: userData.email,
    fullName: userData.fullName,
    city: userData.city || "",
    country: userData.country || "",
    profilePicUrl: userData.profilePicUrl || null,
    roles: userData.roles || [],
  };

  setUser(updatedUser);
  
  console.log("AuthContext user after login:", updatedUser);// MUST include profilePicUrl, fullName, city, country
    if (jwtToken) setToken(jwtToken);
  };

  const logout = () => {
    setUser(null);
    setToken("");
  };

  useEffect(() => {
    const handleAuthExpired = () => {
      logout();
    };

    window.addEventListener("auth-expired", handleAuthExpired);

    return () => {
      window.removeEventListener("auth-expired", handleAuthExpired);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};