import React from 'react';
import './Footer.css'; 

const Footer = () => {
  return (
    <footer className="news-footer">
      <p><span>MyPage</span></p>
      <p>Powered by SpringBoot & React &copy; {new Date().getFullYear()} MyPage Inc</p>
    </footer>
  );
};

export default Footer;
