// Header.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isTranslucent, setIsTranslucent] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsTranslucent(true);
    } else {
      setIsTranslucent(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${isTranslucent ? 'translucent' : ''}`}>
      <Link to="/" className="brand">MineByte</Link>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/courses">Courses</Link>
        <Link to="/test-your-skills">Test Your Skills</Link>
        <Link to="/accomplishments">Accomplishments</Link>
        <Link to="/quizlet">Quizlet</Link>
      </nav>
    </header>
  );
};

export default Header;
