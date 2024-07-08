import React, { useState } from 'react';
import axios from 'axios';
import './styles/EmailForm.css';

const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const EmailForm = () => {
  const [companyFile, setCompanyFile] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [companyName, setCompanyName] = useState('');
  const [jobLink, setJobLink] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailFormat, setEmailFormat] = useState('{first}.{last}@{company}.com'); // Default email format

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('companyFile', companyFile);
    formData.append('resumeFile', resumeFile);
    formData.append('companyName', companyName);
    formData.append('jobLink', jobLink);
    formData.append('email', email);
    formData.append('password', password);
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
    } catch (error) {
      console.error(error);
      alert('An error occurred while processing the files.');
    }
  };

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">A bee's NFT Collection</p>
          <p className="sub-text">
            Bee unique. Bee beautiful. Bee your NFT today.
          </p>
        </div>

        <div className="email-form-container">
          <form onSubmit={handleSubmit} className="email-form">
            <h2>Email Sender</h2>
            <div className="form-group">
              <label htmlFor="companyFile"> </label>
              <input
                id="companyFile"
                type="file"
                onChange={(e) => setCompanyFile(e.target.files[0])}
                required
              />
              <label htmlFor="companyFile" className="file-upload-button">
                Choose Company File
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="resumeFile">&nbsp;</label>
              <input
                id="resumeFile"
                type="file"
                onChange={(e) => setResumeFile(e.target.files[0])}
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
            <div className="form-group">
              <label>Email Format:</label>
              <input
                type="text"
                value={emailFormat}
                onChange={(e) => setEmailFormat(e.target.value)}
                required
              />
            </div>
            <label htmlFor="resumeFile">&nbsp;</label>

            <button type="submit" className="cta-button cta-button-gradient">
              Send Emails
            </button>
          </form>
        </div>

        <div className="footer-container">
          <a
            className="footer-text"
            href={'https://abhitej-bokka.github.io/'}
            target="_blank"
            rel="noreferrer"
          >{`built by Abhitej and made possible by ${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default EmailForm;
