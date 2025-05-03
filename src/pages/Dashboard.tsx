import React, { useEffect, useState } from 'react';

const Dashboard: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userDob, setUserDob] = useState<string| null>(null);
  const [userMobile, setUserMobile] = useState<string| null>(null);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>('home'); // Track which section to show

  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);

    // Fetch user data from localStorage if logged in
    if (loggedIn) {
      setUserName(localStorage.getItem('userName'));
      setUserEmail(localStorage.getItem('userEmail'));
      setUserDob(localStorage.getItem('userDob'));
      setUserMobile(localStorage.getItem('userMobile'));

      const photoFromStorage = localStorage.getItem('userPhoto');
        console.log("Profile Photo URL Retrieved from LocalStorage: ", photoFromStorage);  // Check URL here
        
        if (photoFromStorage) {
            setProfilePhoto(photoFromStorage);  // Set photo URL
        } else {
            setProfilePhoto('/defaultProfile.png');  // Default if no photo is found
        }
    }
  }, []);

  const handleSaveProfile = () => {
    alert('Profile updated successfully!');
    // In real app, here you'd send updated profile to backend
  };

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        localStorage.setItem('userPhoto', reader.result as string);
        setProfilePhoto(reader.result as string); // Update state to reflect immediately
      };
      reader.readAsDataURL(file); // Convert to base64 string
    }
  };

  if (!isLoggedIn) {
    return <p>You need to be logged in to view the dashboard.</p>;
  }

  return (
    <div className="d-flex" style={{ height: '90vh' }}>
      
      {/* Sidebar */}
      <div style={{
  width: '220px',
  backgroundColor: '#f0f0f0',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',        // 🔥 ADD THIS LINE
  gap: '20px',
  borderRight: '1px solid #ccc'
}}>

      {/* Profile Photo */}
      <img
    src={profilePhoto || '/defaultProfile.png'}  // Default if no profile photo is found
    alt="Profile"
    style={{
        width: '120px',
        height: '120px',
        borderRadius: '20%',
        objectFit: 'cover',
        marginBottom: '10px',
        border: '2px solid #ccc',
    }}
/>

        <h4 style={{ fontWeight: 'bold', color: '#333' }}>Dashboard</h4>
        <div 
          style={{ fontWeight: '500', color: '#555', cursor: 'pointer' }} 
          onClick={() => setActiveSection('documents')}
        >
          Documents
        </div>
        <div 
          style={{ fontWeight: '500', color: '#555', cursor: 'pointer' }} 
          onClick={() => setActiveSection('settings')}
        >
          Settings
        </div>
        <div 
          style={{ fontWeight: '500', color: '#555', cursor: 'pointer' }} 
          onClick={() => setActiveSection('profile')}
        >
          Profile
        </div>
      </div>

      {/* Main Content */}
      <div className="container" style={{ padding: '30px' }}>
        {activeSection === 'home' && (
          <>
            <h1>Hi, {userName}!</h1>
            <p>Email: {userEmail}</p>
          </>
        )}

        {activeSection === 'documents' && (
          <>
            <h2>Documents Section</h2>
            <p>Coming soon...</p>
          </>
        )}

        {activeSection === 'settings' && (
          <>
            <h2>Settings Section</h2>
            <p>Coming soon...</p>
          </>
        )}

        {activeSection === 'profile' && (
          <>
            <h2>My Profile</h2>
            <div className="mb-3">
              <label>Name:</label>
              <input 
                type="text" 
                className="form-control" 
                value={userName ?? ''} 
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label>Date of Birth:</label>
              <input 
                type="date" 
                className="form-control" 
                value={userDob ?? ''} 
                onChange={(e) => setUserDob(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label>Mobile No:</label>
              <input 
                type="text" 
                className="form-control" 
                value={userMobile?? ''} 
                onChange={(e) => setUserMobile(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label>Email (cannot edit):</label>
              <input 
                type="email" 
                className="form-control" 
                value={userEmail ?? ''} 
                disabled 
              />
            </div>
            <button className="btn btn-primary" onClick={handleSaveProfile}>
              Save Profile
            </button>
          </>
        )}
      </div>

    </div>
  );
};

export default Dashboard;
