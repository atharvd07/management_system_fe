import React, { useState } from 'react';
import axios from 'axios';

const AppFeedback: React.FC = () => {

  const [formData, setFormData] =
    useState({

      userId:
        localStorage.getItem('userId') || '',

      userName:
        localStorage.getItem('userName') || '',

      feedbackDept: '',

      feedbackDetails: ''
    });

  // Handle Input Change
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value
    });
  };

  // Handle Submit
  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();
console.log(formData);
    try {

      const response =
        await axios.post(

          'http://localhost:8080/api/feedback/save',

          formData
        );

      alert(
        'Feedback submitted successfully!'
      );

      console.log(response.data);

      // Reset only editable fields
      setFormData({

        userId:
          localStorage.getItem('userId') || '',

        userName:
          localStorage.getItem('userName') || '',

        feedbackDept: '',

        feedbackDetails: ''
      });

    } catch (error) {

      alert(
        'Failed to submit feedback!'
      );

      console.error(error);
    }
  };

  return (

    <div
      className="d-flex justify-content-center"
      style={{
        paddingBottom: '100px'
      }}
    >

      <div
        className="card"
        style={{
          width: '100%'
        }}
      >

        <div className="card-body">

          <h4
            className="card-title text-center mb-4"
          >
            Feedback Form
          </h4>

          <form onSubmit={handleSubmit}>

            {/* User ID */}
            <div className="mb-3">

              <label className="form-label">
                User ID
              </label>

              <input
                type="text"
                name="userId"
                className="form-control"
                value={formData.userId}
                disabled
              />

            </div>

            {/* User Name */}
            <div className="mb-3">

              <label className="form-label">
                User Name
              </label>

              <input
                type="text"
                name="userName"
                className="form-control"
                value={formData.userName}
                disabled
              />

            </div>

            {/* Department */}
            <div className="mb-3">

              <label className="form-label">
                Feedback For Department
              </label>

              <select
                name="feedbackDept"
                className="form-select"
                value={formData.feedbackDept}
                onChange={handleChange}
                required
              >

                <option value="">
                  Select Department
                </option>

                <option value="HR">
                  HR
                </option>

                <option value="IT">
                  IT
                </option>

                <option value="Finance">
                  Finance
                </option>

                <option value="Admin">
                  Admin
                </option>

              </select>

            </div>

            {/* Feedback Details */}
            <div className="mb-3">

              <label className="form-label">
                Feedback Details
              </label>

              <textarea
                name="feedbackDetails"
                className="form-control"
                rows={5}
                placeholder="Enter feedback"
                value={
                  formData.feedbackDetails
                }
                onChange={handleChange}
                required
              />

            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary w-100"
            >
              Submit Feedback
            </button>

          </form>

        </div>

      </div>

    </div>
  );
};

export default AppFeedback;