import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header: React.FC = () => {

  const [isLoggedIn, setIsLoggedIn] =
    useState(false);

  const [userName, setUserName] =
    useState<string | null>(null);
    const [userId, setUserId] =
    useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {

    const token =
      localStorage.getItem('token');

    const loggedIn =
      localStorage.getItem('isLoggedIn') === 'true';

    // User considered logged in only if token exists
    if (token && loggedIn) {

      setIsLoggedIn(true);

      setUserName(
        localStorage.getItem('userName')
      );

      setUserId(
        localStorage.getItem('userId')
      );

    } else {

      setIsLoggedIn(false);
    }

  }, []);

  const handleLogout = () => {

    // Clear complete localStorage
    localStorage.clear();

    setIsLoggedIn(false);

    setUserName(null);

    navigate('/login');

    window.location.reload();
  };

  return (

    <header
      className="py-3"
      style={{
        backgroundColor: '#87CEEB',
        marginBottom: '5px'
      }}
    >

      <div
        className="container d-flex align-items-center justify-content-between"
      >

        {/* Logo */}
        <img
          src="/logo.png"
          alt="Logo"
          style={{
            height: '40px',
            marginRight: '10px'
          }}
        />

        {/* Title */}
        <h1
          className="m-0"
          style={{
            color: 'navy',
            fontWeight: 'bold',
            fontSize: '1.5rem'
          }}
        >
          Document Management System
        </h1>

        {/* Conditional Buttons */}
        <div>

          {!isLoggedIn ? (

            <>
              <Link to="/signup">

                <button
                  className="btn btn-primary"
                  style={{ marginRight: '10px' }}
                >
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

              <span className="mr-3 px-2 py-1">
                Hi, {userName}
              </span>

              <button
                className="btn btn-danger"
                onClick={handleLogout}
              >
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