import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup'; // Import your Signup component
import Login from './pages/Login'; // Import your Login component
import Header from './pages/Header'; // Import Header component
import Footer from './pages/Footer'; // Import Footer component
import Dashboard from './pages/Dashboard'; // Import Footer component

function App() {
  return (
    <Router>
      <Header /> {/* Only add Header here, it will show for all pages */}
      <Routes>
        <Route path="/" element={<Login />} /> {/* Default route for Page load */}
        <Route path="/signup" element={<Signup />} /> {/* Signup */}
        <Route path="/login" element={<Login />} /> {/* Login route */}
        <Route path="/dashboard" element={<Dashboard />} /> {/* Add Dashboard route */}
      </Routes>
      <Footer /> {/* Add Footer here */}
    </Router>
  );
}
//asdfghjkl
export default App;
//commit