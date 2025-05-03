import React, { useState } from 'react';
import axios from 'axios';
import Footer from './Footer';  // Import Footer component
import Header from './Header';  // Import Header component

const Signup: React.FC = () => {
  // State to handle form data and profile photo
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    mobileNo: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle profile photo change with validation for size and type
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];

      // Check file size (limit to 5MB)
      if (file.size > 5000000) {  // 5MB in bytes
        alert('File size is too large! Max 5MB.');
        return;
      }

      // Check file type (only allow images)
      if (!file.type.startsWith('image/')) {
        alert('Please upload a valid image!');
        return;
      }

      setProfilePhoto(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    // Create FormData object to send form data and profile photo (if available)
    const data = new FormData();
    data.append('name', formData.name);
    data.append('dob', formData.dob);
    data.append('mobileNo', formData.mobileNo);
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('confirmPassword', formData.confirmPassword);

    // Only append profile photo if it's available
    if (profilePhoto) {
      data.append('profilePhoto', profilePhoto);
    }

    try {
      // Make POST request to the Spring Boot backend
      const response = await axios.post('http://localhost:8080/api/users/signup', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Signup successful!');

      // Reset form data and profile photo after successful signup
      setFormData({
        name: '',
        dob: '',
        mobileNo: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
      setProfilePhoto(null);  // Reset profile photo field

      console.log(response.data);
    } catch (error) {
      alert('Signup failed! Please try again.');
      console.error(error);
    }
  };

  return (
    <div>
      {/* <Header />  Add Header component here */}
    <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh', flexDirection: 'column' }}>
        <div className="card" style={{ width: '400px' }}>
          <div className="card-body">
            <h5 className="card-title text-center mb-4">Signup</h5>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="mb-3">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  type="date"
                  name="dob"
                  placeholder="DOB"
                  className="form-control"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  name="mobileNo"
                  placeholder="Mobile No"
                  className="form-control"
                  value={formData.mobileNo}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="form-control"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  type="file"
                  name="profilePhoto"
                  className="form-control"
                  onChange={handleFileChange}
                />
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Signup
              </button>
            </form>
          </div>
        </div>
        <Footer />  {/* Add Footer component here */}
      </div>
    </div>
  );
};

export default Signup;
