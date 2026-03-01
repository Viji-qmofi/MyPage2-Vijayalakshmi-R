import { useState } from 'react'
import { Routes, Route } from 'react-router'
import { AuthProvider } from "./context/AuthContext";
import './App.css'
import Login from './components/Pages/Login'
import Register from './components/Pages/Register'
import PrivateRoute from "./components/PrivateRoute";
import News from './components/Pages/News/News'
import ContactUs from './components/Pages/Contact/ContactUs'
import Footer from './components/Common/Footer'
import Header from './components/Common/Header'
import Profile from './components/Pages/News/Profile';

function App() {

  return (
    <div className="container">
      <div className="news-app">
        <div className='news'>
          <Header />
          <Routes>
            
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/news" element={<PrivateRoute><News /></PrivateRoute>} />
            <Route path="/categories/:category" element={<PrivateRoute><News /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile  /></PrivateRoute>} />
            <Route path="/bookmarks" element={<PrivateRoute><News /></PrivateRoute>} />
            <Route path="/contactus" element={<ContactUs />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </div>
  )
}
export default App
