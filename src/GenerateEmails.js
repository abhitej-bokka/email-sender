import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/EmailForm.css';

const GenerateEmails = () => {
  const [companyFile, setCompanyFile] = useState(null);
  const [companyName, setCompanyName] = useState('Company Name ex. Yahoo');
  const [emailFormat, setEmailFormat] = useState('{first}.{last}@{company}.com'); // Default email format

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('companyFile', companyFile);
    formData.append('companyName', companyName);
    formData.append('emailFormat', emailFormat);

    try {
      const response = await axios.post('http://localhost:5000/process-files', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        responseType: 'blob' // Important for file download
      });

      // Create a link to download the file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Emails_${companyName}.txt`); // The file name
      document.body.appendChild(link);
      link.click();
      link.remove();

      alert('File downloaded. Please verify the emails and submit the verified emails file.');
      navigate('/verify-emails'); // Navigate to the next step
    } catch (error) {
      console.error(error);
      alert('An error occurred while processing the files.');
    }
  };

  const handleNavigateToVerify = () => {
    navigate('/verify-emails');
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
            <h2>Generate Emails</h2>
            <div className="form-group">
              <label htmlFor="companyFile"> </label>
              <input
                id="companyFile"
                type="file"
                onChange={(e) => setCompanyFile(e.target.files[0])}
                required
              />
              <label htmlFor="companyFile" className="file-upload-button">
                {companyFile ? `File: ${companyFile.name}` : 'Choose Company File'}
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
              <label>Email Format:</label>
              <input
                type="text"
                value={emailFormat}
                onChange={(e) => setEmailFormat(e.target.value)}
                required
              />
            </div>
            <label>&nbsp;</label>
            <button type="submit" className="cta-button cta-button-gradient">
              Generate Emails
            </button>
            <label>&nbsp;</label>

            <button type="button" onClick={handleNavigateToVerify} className="file-upload-button">
              Verify Emails
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GenerateEmails;
