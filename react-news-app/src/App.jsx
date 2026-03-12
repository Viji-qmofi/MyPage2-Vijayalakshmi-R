import { Routes, Route } from "react-router";
import "./App.css";
import Login from "./auth/Login";
import Register from "./auth/Register";
import News from "./components/Pages/News/News";
import ContactUs from "./components/Pages/Contact/ContactUs";
import Footer from "./components/Common/Footer";
import Header from "./components/Common/Header";
import Profile from "./components/Pages/News/EditProfile";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";
import OAuthSuccess from "./auth/OAuthSuccess";
import PrivateRoute from "./auth/PrivateRoute";

function App() {
  return (
    <div className="container">
      <div className="news-app">
        <div className="news">
          <Header />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/oauth-success" element={<OAuthSuccess />} />
            <Route
              path="/news"
              element={
                <PrivateRoute>
                  <News />
                </PrivateRoute>
              }
            />
            <Route
              path="/categories/:category"
              element={
                <PrivateRoute>
                  <News />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/bookmarks"
              element={
                <PrivateRoute>
                  <News />
                </PrivateRoute>
              }
            />
            <Route path="/contactus" element={<ContactUs />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;