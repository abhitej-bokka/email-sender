import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/VerifyEmails.css';

const VerifyEmails = () => {
  const [verifiedEmailsFile, setVerifiedEmailsFile] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [companyName, setCompanyName] = useState('Company Name i.e. Yahoo');
  const [jobLink, setJobLink] = useState(''); // Added jobLink state
  const [email, setEmail] = useState('abhitej.bokka.tutor@gmail.com');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('verifiedEmailsFile', verifiedEmailsFile);
    formData.append('resumeFile', resumeFile);
    formData.append('companyName', companyName);
    formData.append('jobLink', jobLink); // Added jobLink to formData
    formData.append('email', email);
    formData.append('password', password);
    formData.append('emailSubject', localStorage.getItem('emailSubject'));
    formData.append('emailBody', localStorage.getItem('emailBody'));
  
    try {
      await axios.post('http://localhost:5000/verify-emails', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      alert('Emails verified and sent successfully.');
      navigate('/'); // Navigate to the main page or another page
    } catch (error) {
      console.error(error);
      alert('An error occurred while verifying the emails.');
    }
  };
  

  const handleFileChange = (e, setFile) => {
    setFile(e.target.files[0]);
    e.target.nextElementSibling.innerText = e.target.files[0].name; // Update button text with file name
  };

  const handleEditTemplate = () => {
    navigate('/edit-template');
  };

  const handleGenerateEmails = () => {
    navigate('/');
  };

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">Ask by Abhi</p>
          <p className="sub-text">
            Bee unique. Bee beautiful. Bee curious.
          </p>
        </div>

        <div className="email-form-container">
          <form onSubmit={handleSubmit} className="email-form">
            <h2>Verify Emails</h2>
            <div className="form-group">
            <label>&nbsp;</label>
              <input
                id="verifiedEmailsFile"
                type="file"
                onChange={(e) => handleFileChange(e, setVerifiedEmailsFile)}
                required
              />
              <label htmlFor="verifiedEmailsFile" className="file-upload-button">
                Choose Verified Emails File
              </label>
            </div>
            <div className="form-group">
            <label>&nbsp;</label>
              <input
                id="resumeFile"
                type="file"
                onChange={(e) => handleFileChange(e, setResumeFile)}
                required
              />
              <label htmlFor="resumeFile" className="file-upload-button">
                Choose Resume File
              </label>
            </div>
            <div className="form-group">
              <label>Company Name:</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Job Link:</label>
              <input
                type="text"
                value={jobLink}
                onChange={(e) => setJobLink(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="cta-button cta-button-gradient">
              Verify Emails
            </button>
            <label>&nbsp;</label>

            <button type="button" onClick={handleEditTemplate} className="file-upload-button">
              Edit Email Template
            </button>
            <label>&nbsp;</label>

            <button type="button" onClick={handleGenerateEmails} className="file-upload-button">
              Generate Emails
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmails;
