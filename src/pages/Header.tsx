import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);

    // Fetch user name and email from localStorage
    if (loggedIn) {
      setUserName(localStorage.getItem('userName'));
    }
  }, []);

  const handleLogout = () => {
    // Remove user data and login status from localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    
    setIsLoggedIn(false);
    setUserName(null);
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <header className="py-3" style={{ backgroundColor: '#87CEEB', marginBottom: '5px' }}>
      <div className="container d-flex align-items-center justify-content-between">
        {/* Logo */}
        <img src="/logo.png" alt="Logo" style={{ height: '40px', marginRight: '10px' }} />

        {/* Title */}
        <h1 className="m-0" style={{ color: 'navy', fontWeight: 'bold', fontSize: '1.5rem' }}>
          Document Management System
        </h1>

        {/* Conditional Buttons */}
        <div>
          {!isLoggedIn ? (
            <>
              <Link to="/signup">
                <button className="btn btn-primary" style={{ marginRight: '10px' }}>
                  Signup
                </button>
              </Link>
              <Link to="/login">
                <button className="btn btn-secondary">
                  Login
                </button>
              </Link>
            </>
          ) : (
            <div>
              <span className="mr-3 px-2 py-1">Hi, {userName}</span>
              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
