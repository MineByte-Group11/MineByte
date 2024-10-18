import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import MainPage from './pages/MainPage';
import CourseSelection from './pages/CourseSelection';
import TestYourSkills from './pages/TestYourSkills';
import Accomplishments from './pages/Accomplishments';
import QuizletPage from './pages/QuizletPage';
import Login from './pages/Login'; 

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(''); // Add username state

  // Function to handle login
  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setUsername(user); // Set the logged-in username
  };

  return (
    <Router>
      {isLoggedIn ? (
        <Layout username={username}> {/* Pass username to Layout */}
          <Routes>
            <Route path="/" element={<MainPage username={username} />} /> {/* Pass username */}
            <Route path="/courses" element={<CourseSelection />} />
            <Route path="/test-your-skills" element={<TestYourSkills />} />
            <Route path="/accomplishments" element={<Accomplishments />} />
            <Route path="/quizlet" element={<QuizletPage />} />
          </Routes>
        </Layout>
      ) : (
        <Routes>
          <Route path="/" element={<Login onLogin={handleLogin} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </Router>
  );
};

export default App;
