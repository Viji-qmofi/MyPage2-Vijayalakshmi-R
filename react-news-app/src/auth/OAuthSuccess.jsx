import { useEffect, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function OAuthSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      navigate("/");
      return;
    }

    localStorage.setItem("token", token);

    api
      .get("/auth/oauth-user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((userRes) => {
        login(userRes.data.data, token);
        navigate("/news");
      })
      .catch(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
      });
  }, [searchParams, navigate, login]);

  return (
    <div className="profile-container">
      <div className="profile-card">Signing you in...</div>
    </div>
  );
}