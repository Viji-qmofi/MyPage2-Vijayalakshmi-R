import { createContext, useState, useEffect } from "react";


export const AuthContext = createContext();

const getTokenExpiryTime = (token) => {
  try {
    if (!token) return null;

    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp ? payload.exp * 1000 : null;
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user") || "null")
  );

  // Sync with localStorage
  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");

    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [token, user]);

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

    if (jwtToken) setToken(jwtToken);
  };

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/";
  };

  // Logout immediately if token already expired
  useEffect(() => {
    if (!token) return;

    const expiryTime = getTokenExpiryTime(token);

    if (!expiryTime || expiryTime <= Date.now()) {
      logout();
    }
  }, [token]);

  // Schedule logout exactly when token expires
  useEffect(() => {
    if (!token) return;

    const expiryTime = getTokenExpiryTime(token);

    if (!expiryTime) {
      logout();
      return;
    }

    const timeLeft = expiryTime - Date.now();

    if (timeLeft <= 0) {
      logout();
      return;
    }

    const timer = setTimeout(() => {
      logout();
    }, timeLeft);

    return () => clearTimeout(timer);
  }, [token]);

  // Logout if axios interceptor triggers auth-expired
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
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};