import { useState } from 'react'
import { Routes, Route } from 'react-router'
import './App.css'
import News from './components/Pages/News/News'
import ContactUs from './components/Pages/Contact/ContactUs'
import Footer from './components/Common/Footer'
import Header from './components/Common/Header'

function App() {

  return (
    <div className="container">
      <div className="news-app">
        <div className='news'>
          <Header />
          <Routes>
            <Route path="/" element={<News />} />
            <Route path="/categories/:category" element={<News />} />
            <Route path="/bookmarks" element={<News />} />
            <Route path="/contactus" element={<ContactUs />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </div>
  )
}
export default App
