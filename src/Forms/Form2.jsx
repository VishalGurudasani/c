import React, { useState } from 'react';
import '../CSS/Form2.css';

const Form2 = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    applyingForPosition: '',
    relevantExperience: '',
    portfolioURL: '',
    managementExperience: '',
    additionalSkills: {
      JavaScript: false,
      CSS: false,
      React: false,
    },
    preferredInterviewTime: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData({
        ...formData,
        additionalSkills: {
          ...formData.additionalSkills,
          [name]: checked,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      setSubmitted(true);
      console.log('Form submitted:', formData);
    }
  };

  const validateForm = (data) => {
    let errors = {};
    if (!data.fullName.trim()) {
      errors.fullName = 'Full Name is required';
    }

    if (!data.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = 'Email is invalid';
    }

    if (!data.phoneNumber.trim()) {
      errors.phoneNumber = 'Phone Number is required';
    } else if (isNaN(data.phoneNumber)) {
      errors.phoneNumber = 'Phone Number must be a valid number';
    }

    if (!data.applyingForPosition.trim()) {
      errors.applyingForPosition = 'Applying for Position is required';
    }

    if (data.applyingForPosition === 'Developer' || data.applyingForPosition === 'Designer') {
      if (!data.relevantExperience.trim()) {
        errors.relevantExperience = 'Relevant Experience is required';
      } else if (isNaN(data.relevantExperience) || parseInt(data.relevantExperience, 10) <= 0) {
        errors.relevantExperience = 'Relevant Experience must be a number greater than 0';
      }
    }

    if (data.applyingForPosition === 'Designer') {
      if (!data.portfolioURL.trim()) {
        errors.portfolioURL = 'Portfolio URL is required';
      } else if (!isValidURL(data.portfolioURL)) {
        errors.portfolioURL = 'Portfolio URL is not valid';
      }
    }

    if (data.applyingForPosition === 'Manager') {
      if (!data.managementExperience.trim()) {
        errors.managementExperience = 'Management Experience is required';
      }
    }

    if (Object.values(data.additionalSkills).every(skill => !skill)) {
      errors.additionalSkills = 'Select at least one Additional Skill';
    }

    if (!data.preferredInterviewTime.trim()) {
      errors.preferredInterviewTime = 'Preferred Interview Time is required';
    }

    return errors;
  };

  const isValidURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <div className="width">
    <div className="container">
      <h1>Job Application Form</h1>

      {!submitted ? (
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label >Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={errors.fullName ? 'error' : ''}
            />
            {errors.fullName && <span className="error-message">{errors.fullName}</span>}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label >Phone Number</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={errors.phoneNumber ? 'error' : ''}
            />
            {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
          </div>

          <div className="form-group">
            <label >Applying for Position</label>
            <select
              id="applyingForPosition"
              name="applyingForPosition"
              value={formData.applyingForPosition}
              onChange={handleChange}
              className={errors.applyingForPosition ? 'error' : ''}
            >
              <option value="">Select</option>
              <option value="Developer">Developer</option>
              <option value="Designer">Designer</option>
              <option value="Manager">Manager</option>
            </select>
            {errors.applyingForPosition && <span className="error-message">{errors.applyingForPosition}</span>}
          </div>

          {(formData.applyingForPosition === 'Developer' || formData.applyingForPosition === 'Designer') && (
            <div className="form-group">
              <label htmlFor="relevantExperience">Relevant Experience (years)</label>
              <input
                type="number"
                id="relevantExperience"
                name="relevantExperience"
                value={formData.relevantExperience}
                onChange={handleChange}
                className={errors.relevantExperience ? 'error' : ''}
              />
              {errors.relevantExperience && <span className="error-message">{errors.relevantExperience}</span>}
            </div>
          )}

          {formData.applyingForPosition === 'Designer' && (
            <div className="form-group">
              <label htmlFor="portfolioURL">Portfolio URL</label>
              <input
                type="text"
                id="portfolioURL"
                name="portfolioURL"
                value={formData.portfolioURL}
                onChange={handleChange}
                className={errors.portfolioURL ? 'error' : ''}
              />
              {errors.portfolioURL && <span className="error-message">{errors.portfolioURL}</span>}
            </div>
          )}

          {formData.applyingForPosition === 'Manager' && (
            <div className="form-group">
              <label htmlFor="managementExperience">Management Experience</label>
              <textarea
                id="managementExperience"
                name="managementExperience"
                value={formData.managementExperience}
                onChange={handleChange}
                className={errors.managementExperience ? 'error' : ''}
              />
              {errors.managementExperience && <span className="error-message">{errors.managementExperience}</span>}
            </div>
          )}

          <div className="form-group">
            <label>Additional Skills</label>
            <div className="checkbox-group">
              {Object.keys(formData.additionalSkills).map(skill => (
                <label key={skill}>
                  <input
                    type="checkbox"
                    name={skill}
                    checked={formData.additionalSkills[skill]}
                    onChange={handleChange}
                  />
                  {skill}
                </label>
              ))}
            </div>
            {errors.additionalSkills && <span className="error-message">{errors.additionalSkills}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="preferredInterviewTime">Preferred Interview Time</label>
            <input
              type="datetime-local"
              id="preferredInterviewTime"
              name="preferredInterviewTime"
              value={formData.preferredInterviewTime}
              onChange={handleChange}
              className={errors.preferredInterviewTime ? 'error' : ''}
            />
            {errors.preferredInterviewTime && <span className="error-message">{errors.preferredInterviewTime}</span>}
          </div>

          <button type="submit">Submit</button>
        </form>
      ) : (
        <div className="summary">
          <h2>Application Summary</h2>
          <p><strong>Full Name:</strong> {formData.fullName}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Phone Number:</strong> {formData.phoneNumber}</p>
          <p><strong>Applying for Position:</strong> {formData.applyingForPosition}</p>
          {(formData.applyingForPosition === 'Developer' || formData.applyingForPosition === 'Designer') && (
            <p><strong>Relevant Experience:</strong> {formData.relevantExperience}</p>
          )}
          {formData.applyingForPosition === 'Designer' && (
            <p><strong>Portfolio URL:</strong> {formData.portfolioURL}</p>
          )}
          {formData.applyingForPosition === 'Manager' && (
            <p><strong>Management Experience:</strong> {formData.managementExperience}</p>
          )}
          <p><strong>Additional Skills:</strong> {Object.keys(formData.additionalSkills).filter(skill => formData.additionalSkills[skill]).join(', ')}</p>
          <p><strong>Preferred Interview Time:</strong> {formData.preferredInterviewTime}</p>
        </div>
      )}
    </div>
    </div>
  );
};

export default Form2;
