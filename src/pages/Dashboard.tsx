import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppFeedback from './app_components/app_feedback';

const Dashboard: React.FC = () => {

  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] =
    useState(false);

  const [userName, setUserName] =
    useState<string | null>(null);

  const [userEmail, setUserEmail] =
    useState<string | null>(null);

  const [userDob, setUserDob] =
    useState<string | null>(null);

  const [userMobile, setUserMobile] =
    useState<string | null>(null);

  const [profilePhoto, setProfilePhoto] =
    useState<string | null>(null);

  const [activeSection, setActiveSection] =
    useState<string>('home');

  const [activeApplicationTab,
    setActiveApplicationTab] =
    useState<string>('feedback');

  useEffect(() => {

    // Check JWT token
    const token =
      localStorage.getItem('token');

    if (!token) {

      navigate('/login');
      return;
    }

    // Check login status
    const loggedIn =
      localStorage.getItem(
        'isLoggedIn'
      ) === 'true';

    setIsLoggedIn(loggedIn);

    // Fetch user data
    if (loggedIn) {

      setUserName(
        localStorage.getItem(
          'userName'
        )
      );

      setUserEmail(
        localStorage.getItem(
          'userEmail'
        )
      );

      setUserDob(
        localStorage.getItem(
          'userDob'
        )
      );

      setUserMobile(
        localStorage.getItem(
          'userMobile'
        )
      );

      const photoFromStorage =
        localStorage.getItem(
          'userPhoto'
        );

      if (photoFromStorage) {

        setProfilePhoto(
          photoFromStorage
        );

      } else {

        setProfilePhoto(
          '/defaultProfile.png'
        );
      }
    }

  }, [navigate]);

  const handleSaveProfile = () => {

    alert(
      'Profile updated successfully!'
    );
  };

  const handlePhotoChange = (
    event:
      React.ChangeEvent<HTMLInputElement>
  ) => {

    const file =
      event.target.files
        ? event.target.files[0]
        : null;

    if (file) {

      const reader =
        new FileReader();

      reader.onloadend = () => {

        localStorage.setItem(
          'userPhoto',
          reader.result as string
        );

        setProfilePhoto(
          reader.result as string
        );
      };

      reader.readAsDataURL(file);
    }
  };

  if (!isLoggedIn) {

    return (
      <p>
        You need to be logged in
        to view the dashboard.
      </p>
    );
  }

  return (

    <div
  className="d-flex"
  style={{
    height: '90vh'
  }}
>

      {/* Sidebar */}
      <div
        style={{
          width: '220px',
          backgroundColor: '#f0f0f0',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
          borderRight:
            '1px solid #ccc'
        }}
      >

        {/* Profile Photo */}
        <img
          src={
            profilePhoto ||
            '/defaultProfile.png'
          }
          alt="Profile"
          style={{
            width: '120px',
            height: '120px',
            borderRadius: '20%',
            objectFit: 'cover',
            marginBottom: '10px',
            border:
              '2px solid #ccc',
          }}
        />

        <h4
          style={{
            fontWeight: 'bold',
            color: '#333'
          }}
        >
          Dashboard
        </h4>

        {/* Home */}
        <div
          style={{
            fontWeight: '500',
            color: '#555',
            cursor: 'pointer'
          }}
          onClick={() =>
            setActiveSection(
              'home'
            )
          }
        >
          Home
        </div>

        {/* Documents */}
        <div
          style={{
            fontWeight: '500',
            color: '#555',
            cursor: 'pointer'
          }}
          onClick={() =>
            setActiveSection(
              'documents'
            )
          }
        >
          Documents
        </div>

        {/* Settings */}
        <div
          style={{
            fontWeight: '500',
            color: '#555',
            cursor: 'pointer'
          }}
          onClick={() =>
            setActiveSection(
              'settings'
            )
          }
        >
          Settings
        </div>

        {/* All Applications */}
        <div
          style={{
            fontWeight: '500',
            color: '#555',
            cursor: 'pointer'
          }}
          onClick={() =>
            setActiveSection(
              'applications'
            )
          }
        >
          All Applications
        </div>

        {/* Profile */}
        <div
          style={{
            fontWeight: '500',
            color: '#555',
            cursor: 'pointer'
          }}
          onClick={() =>
            setActiveSection(
              'profile'
            )
          }
        >
          Profile
        </div>

      </div>

      {/* Main Content */}
      <div
  className="container"
  style={{
    padding: '30px',
    overflowY: 'auto',
    flex: 1
  }}
>

        {/* Home */}
        {activeSection === 'home' && (
          <>
            <h1>
              Hi, {userName}!
            </h1>

            <p>
              Email: {userEmail}
            </p>
          </>
        )}

        {/* Documents */}
        {activeSection ===
          'documents' && (
          <>
            <h2>
              Documents Section
            </h2>

            <p>
              Coming soon...
            </p>
          </>
        )}

        {/* Settings */}
        {activeSection ===
          'settings' && (
          <>
            <h2>
              Settings Section
            </h2>

            <p>
              Coming soon...
            </p>
          </>
        )}

        {/* All Applications */}
        {activeSection ===
          'applications' && (
          <>

            <h2>
              All Applications
            </h2>

            {/* Tabs */}
            <div
              className="d-flex gap-3 mb-4"
            >

              {/* Feedback Tab */}
              <button
                className={
                  activeApplicationTab ===
                  'feedback'
                    ? 'btn btn-primary'
                    : 'btn btn-outline-primary'
                }
                onClick={() =>
                  setActiveApplicationTab(
                    'feedback'
                  )
                }
              >
                Feedback
              </button>

              {/* Grievance Tab */}
              <button
                className={
                  activeApplicationTab ===
                  'grievance'
                    ? 'btn btn-secondary'
                    : 'btn btn-outline-secondary'
                }
                onClick={() =>
                  setActiveApplicationTab(
                    'grievance'
                  )
                }
              >
                Grievance
              </button>

            </div>

            {/* Feedback Component */}
            {activeApplicationTab ===
              'feedback' && (
              <AppFeedback />
            )}

            {/* Grievance Placeholder */}
            {activeApplicationTab ===
              'grievance' && (
              <div
                className="card p-4"
              >
                <h4>
                  Grievance Form
                </h4>

                <p>
                  Coming soon...
                </p>
              </div>
            )}

          </>
        )}

        {/* Profile */}
        {activeSection ===
          'profile' && (
          <>

            <h2>
              My Profile
            </h2>

            {/* Upload Photo */}
            <div className="mb-3">

              <label>
                Upload Profile
                Photo:
              </label>

              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={
                  handlePhotoChange
                }
              />

            </div>

            {/* Name */}
            <div className="mb-3">

              <label>
                Name:
              </label>

              <input
                type="text"
                className="form-control"
                value={
                  userName ?? ''
                }
                onChange={(e) =>
                  setUserName(
                    e.target.value
                  )
                }
              />

            </div>

            {/* DOB */}
            <div className="mb-3">

              <label>
                Date of Birth:
              </label>

              <input
                type="date"
                className="form-control"
                value={
                  userDob ?? ''
                }
                onChange={(e) =>
                  setUserDob(
                    e.target.value
                  )
                }
              />

            </div>

            {/* Mobile */}
            <div className="mb-3">

              <label>
                Mobile No:
              </label>

              <input
                type="text"
                className="form-control"
                value={
                  userMobile ?? ''
                }
                onChange={(e) =>
                  setUserMobile(
                    e.target.value
                  )
                }
              />

            </div>

            {/* Email */}
            <div className="mb-3">

              <label>
                Email
                (cannot edit):
              </label>

              <input
                type="email"
                className="form-control"
                value={
                  userEmail ?? ''
                }
                disabled
              />

            </div>

            {/* Save Button */}
            <button
              className="btn btn-primary"
              onClick={
                handleSaveProfile
              }
            >
              Save Profile
            </button>

          </>
        )}

      </div>

    </div>
  );
};

export default Dashboard;